#!/usr/bin/env python3
"""
Sube la carpeta out/ (export estático de Next.js) a un hosting cPanel por FTP/FTPS.

Lee las credenciales de un archivo externo (no hardcodeadas, no en argv) con formato:
    CP_HOST=ftp.tudominio.com.ar
    CP_USER=usuario
    CP_PASS=contraseña
    CP_DIR=public_html            # opcional, default public_html

Uso:
    python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy list      # lista el destino
    python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy upload    # sube out/ al destino

La contraseña nunca se imprime.
"""
import argparse
import ftplib
import os
import sys

LOCAL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "out")


def load_creds(path):
    creds = {}
    with open(os.path.expanduser(path)) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            creds[k.strip()] = v.strip()
    for req in ("CP_HOST", "CP_USER", "CP_PASS"):
        if not creds.get(req):
            sys.exit(f"Falta {req} en el archivo de credenciales.")
    creds.setdefault("CP_DIR", "public_html")
    return creds


class PatientFTP_TLS(ftplib.FTP_TLS):
    """FTP_TLS que reusa la sesión TLS del control en el canal de datos.

    El server de ospiqyp.org.ar (Pure-FTPd) exige reuso de sesión TLS: sin
    él aborta la transferencia con "451 Error during read from data
    connection" apenas pasa el primer bloque. Python no lo hace solo, así
    que reimplantamos ntransfercmd pasando la sesión del socket de control.

    Además, el unwrap() del cierre TLS se hace tolerante: si el server no
    manda el close_notify (LiteSpeed y otros), el dato ya viajó y lo único
    que importa es el 226 del canal de control vía voidresp().
    """

    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            session = getattr(self.sock, "session", None)
            conn = self.context.wrap_socket(
                conn, server_hostname=self.host, session=session
            )
        return conn, size

    def storbinary(self, cmd, fp, blocksize=8192, callback=None, rest=None):
        self.voidcmd("TYPE I")
        with self.transfercmd(cmd, rest) as conn:
            while True:
                buf = fp.read(blocksize)
                if not buf:
                    break
                conn.sendall(buf)
                if callback:
                    callback(buf)
            if hasattr(conn, "unwrap"):
                try:
                    conn.unwrap()  # cierre TLS limpio: el server lo exige.
                except OSError:
                    pass  # server sin close_notify: el dato ya viajó.
        return self.voidresp()


def connect(creds):
    host, user, pw = creds["CP_HOST"], creds["CP_USER"], creds["CP_PASS"]
    # Intentar FTPS (TLS explícito) primero; si el server no lo soporta, FTP plano.
    try:
        ftp = PatientFTP_TLS()
        ftp.connect(host, 21, timeout=60)
        ftp.login(user, pw)
        ftp.prot_p()
        print(f"Conectado por FTPS (cifrado) a {host} como {user}")
        return ftp
    except Exception as e:
        print(f"FTPS no disponible ({type(e).__name__}); probando FTP plano...")
    ftp = ftplib.FTP()
    ftp.connect(host, 21, timeout=60)
    ftp.login(user, pw)
    print(f"Conectado por FTP a {host} como {user}")
    return ftp


def ensure_dir(ftp, path):
    """Crea path remoto recursivamente y entra (cwd) a él."""
    ftp.cwd("/")
    for part in path.strip("/").split("/"):
        if not part:
            continue
        try:
            ftp.cwd(part)
        except ftplib.error_perm:
            ftp.mkd(part)
            ftp.cwd(part)


def cmd_list(ftp, creds):
    try:
        ftp.cwd("/")
        ftp.cwd(creds["CP_DIR"])
    except ftplib.error_perm as e:
        sys.exit(f"No pude entrar a '{creds['CP_DIR']}': {e}")
    print(f"\nContenido actual de {creds['CP_DIR']}/ :")
    items = []
    ftp.retrlines("LIST", items.append)
    if not items:
        print("  (vacío)")
    for line in items:
        print("  " + line)


def cmd_backup(ftp, creds):
    """Mueve TODO lo que hay hoy en CP_DIR a CP_DIR/_wp_viejo (reversible, no borra)."""
    base = creds["CP_DIR"].rstrip("/")
    backup = "_wp_viejo"
    # Nunca mover estas entradas (requeridas por el server o el propio backup).
    keep = {".", "..", "cgi-bin", backup}
    ftp.cwd("/")
    ftp.cwd(base)
    names = ftp.nlst()
    entries = [n for n in names if os.path.basename(n) not in keep]
    if not entries:
        print("Nada para respaldar (el directorio ya está limpio).")
        return
    try:
        ftp.mkd(backup)
    except ftplib.error_perm:
        pass  # ya existe
    print(f"Moviendo {len(entries)} entradas a {base}/{backup}/ ...")
    moved = 0
    for n in entries:
        leaf = os.path.basename(n)
        try:
            ftp.rename(leaf, f"{backup}/{leaf}")
            moved += 1
            print(f"  movido: {leaf}")
        except ftplib.error_perm as e:
            print(f"  ⚠️  no pude mover {leaf}: {e}")
    print(f"\n✅ Respaldo listo: {moved} entradas en {base}/{backup}/")


def is_immutable_asset(rel):
    """True si el nombre del archivo ya está versionado por contenido.

    Next pone el hash del contenido en el nombre de todo lo que cuelga de
    /_next/static/, así que mismo nombre + mismo tamaño ⇒ mismo archivo y se
    puede saltear sin riesgo. Cualquier otra cosa (HTML, txt, xml, imágenes de
    /public) puede cambiar manteniendo el tamaño y hay que re-subirla siempre.
    """
    return rel.replace(os.sep, "/").startswith("_next/static/")


def cmd_upload(ftp, creds):
    if not os.path.isdir(LOCAL_DIR):
        sys.exit(f"No existe {LOCAL_DIR}. Corré 'npm run build' primero.")
    base = creds["CP_DIR"].rstrip("/")
    files = []
    for root, _dirs, names in os.walk(LOCAL_DIR):
        for n in names:
            files.append(os.path.join(root, n))
    total = len(files)
    print(f"\nSubiendo {total} archivos a {base}/ ...")
    made = set()
    skipped = 0
    for i, local_path in enumerate(sorted(files), 1):
        rel = os.path.relpath(local_path, LOCAL_DIR)
        remote_dir = base + "/" + os.path.dirname(rel).replace(os.sep, "/")
        remote_dir = remote_dir.rstrip("/")
        ensure_dir(ftp, remote_dir)
        made.add(remote_dir)
        leaf = os.path.basename(rel)
        local_size = os.path.getsize(local_path)
        # Reanudación por tamaño: SÓLO para assets inmutables de /_next/static/,
        # cuyo nombre ya incluye el hash del contenido (mismo nombre ⇒ mismo byte).
        #
        # Para el resto NO alcanza comparar tamaño: el build ID de Next tiene largo
        # fijo, así que un index.html que sólo cambió de build ID pesa EXACTAMENTE
        # lo mismo y quedaba sin subir, dejando en prod un HTML viejo apuntando a
        # chunks de un build anterior. Esos archivos se re-suben siempre (son
        # chicos: HTML/txt/xml).
        if is_immutable_asset(rel):
            try:
                ftp.voidcmd("TYPE I")
                if ftp.size(leaf) == local_size:
                    skipped += 1
                    continue
            except ftplib.error_perm:
                pass
        with open(local_path, "rb") as fh:
            ftp.storbinary("STOR " + leaf, fh)
        if i % 10 == 0 or i == total:
            print(f"  {i}/{total}  {rel}")
    print(
        f"\n✅ Listo: {total - skipped} archivos subidos a {base}/"
        f" ({skipped} assets inmutables ya presentes, salteados)"
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--creds", required=True)
    ap.add_argument("action", choices=["list", "backup", "upload"])
    args = ap.parse_args()
    creds = load_creds(args.creds)
    ftp = connect(creds)
    try:
        if args.action == "list":
            cmd_list(ftp, creds)
        elif args.action == "backup":
            cmd_backup(ftp, creds)
        else:
            cmd_upload(ftp, creds)
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


if __name__ == "__main__":
    main()
