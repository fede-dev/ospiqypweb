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
    python3 scripts/deploy_cpanel.py --creds ~/.ospiqyp_deploy prune     # borra lo listado en scripts/prune-list.txt

La contraseña nunca se imprime.
"""
import argparse
import ftplib
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL_DIR = os.path.join(REPO_ROOT, "out")
# La lista de borrado vive versionada en el repo: así queda en el historial de
# git qué se sacó de producción y cuándo, y se revisa en un diff antes de correr.
PRUNE_LIST = os.path.join(REPO_ROOT, "scripts", "prune-list.txt")


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
    """DEPRECADO. Archivaba el WordPress viejo moviendo TODO CP_DIR a _wp_viejo/.

    Se usó UNA sola vez, en la migración de WordPress al export estático, cuando
    CP_DIR todavía tenía el sitio viejo. Hoy CP_DIR ES EL SITIO EN PRODUCCIÓN:
    correr esto por accidente (autocompletado, un comando viejo del historial)
    se lleva index.html y _next/ a un subdirectorio y tira la web abajo en el
    acto. Por eso quedó con el nombre "wp-archive-DEPRECADO" —imposible de
    tipear sin querer— y con el portero de abajo, que aborta si detecta que en
    el destino vive el sitio nuevo.

    No se borró la función porque sigue siendo el único camino de vuelta si
    alguna vez hay que archivar un CP_DIR ajeno al deploy actual.
    """
    base = creds["CP_DIR"].rstrip("/")
    backup = "_wp_viejo"
    # Nunca mover estas entradas (requeridas por el server o el propio backup).
    keep = {".", "..", "cgi-bin", backup}
    ftp.cwd("/")
    ftp.cwd(base)
    names = ftp.nlst()
    presentes = {os.path.basename(n) for n in names}
    # index.html + _next/ juntos son la huella inconfundible del export de Next.
    # Cualquiera de los dos suelto puede ser casualidad; los dos, no.
    if "index.html" in presentes and "_next" in presentes:
        sys.exit(
            f"\n🛑 ABORTADO: en {base}/ hay index.html Y _next/ — ahí vive el sitio\n"
            "   estático EN PRODUCCIÓN, no el WordPress viejo.\n\n"
            "   Mover eso a _wp_viejo/ deja la web caída hasta que alguien lo\n"
            "   revierta a mano. Si de verdad querés archivar otro directorio,\n"
            "   apuntá CP_DIR a ese otro directorio en el archivo de credenciales."
        )
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


def motivo_de_rechazo(rel):
    """Devuelve por qué una ruta de la lista es peligrosa, o None si es sana.

    Todo lo que se rechaza acá es algo que, mal interpretado por el server,
    borraría más de lo escrito: una ruta absoluta se escapa de CP_DIR, un '..'
    sube al home de la cuenta, un comodín lo expande el server (no nosotros) y
    una ruta que se queda sin partes apunta al propio CP_DIR.
    """
    if rel.startswith("/"):
        return "es absoluta; tiene que ser relativa a CP_DIR"
    if any(c in rel for c in "*?[]"):
        return "tiene comodines; sólo se aceptan rutas literales"
    partes = [p for p in rel.strip("/").split("/") if p and p != "."]
    if not partes:
        return "queda vacía: apuntaría al propio CP_DIR"
    if ".." in partes:
        return "sube de directorio con '..'"
    return None


def load_prune_list(path):
    """Lee scripts/prune-list.txt: una ruta por línea, relativa a CP_DIR.

    Es a propósito una lista EXPLÍCITA y escrita a mano. La tentación obvia es
    deducir qué sobra comparando out/ contra el server, pero ese diff se apoya
    en que el build local esté completo: con un out/ a medias (build cortado,
    npm run build que falló silencioso) "lo que sobra" pasa a ser el sitio
    entero y se borra solo. Mantener la lista a mano es barato al lado de eso.
    """
    if not os.path.isfile(path):
        sys.exit(f"No existe la lista {path}. Creala con una ruta por línea.")
    rutas = []
    with open(path, encoding="utf-8") as f:
        for nro, line in enumerate(f, 1):
            rel = line.strip()
            if not rel or rel.startswith("#"):
                continue
            motivo = motivo_de_rechazo(rel)
            if motivo:
                sys.exit(f"{path}:{nro}: ruta rechazada ({motivo}): {rel}")
            rutas.append(rel)
    return rutas


def remote_size(ftp, path):
    """Tamaño en bytes de un archivo remoto, o None si no existe."""
    try:
        ftp.voidcmd("TYPE I")  # SIZE en modo ASCII no lo soportan todos los servers.
        return ftp.size(path)
    except ftplib.all_errors:
        return None


def remote_dir_existe(ftp, path):
    """True si path es un directorio al que se puede entrar. Deja el cwd como estaba."""
    try:
        previo = ftp.pwd()
    except ftplib.all_errors:
        previo = None
    try:
        ftp.cwd(path)
        return True
    except ftplib.all_errors:
        return False
    finally:
        if previo:
            try:
                ftp.cwd(previo)
            except ftplib.all_errors:
                pass


def cmd_prune(ftp, creds):
    """Borra del server SÓLO las rutas escritas en scripts/prune-list.txt.

    Dos fases separadas a propósito: primero releva y muestra qué encontró
    (ruta + tamaño real en el server), y recién después de que un humano
    escriba BORRAR toca algo. Mostrar el tamaño no es decorativo: es la forma
    de darse cuenta de que la ruta que se creía un PNG viejo pesa 40 MB y en
    realidad es otra cosa.
    """
    base = creds["CP_DIR"].rstrip("/")
    rutas = load_prune_list(PRUNE_LIST)
    if not rutas:
        print(f"La lista {PRUNE_LIST} no tiene rutas activas. Nada para borrar.")
        return

    # --- Fase 1: relevar. Acá no se borra NADA. ---
    print(f"\nRelevando {len(rutas)} rutas en {base}/ ...\n")
    plan = []
    for rel in rutas:
        # Ruta absoluta desde la raíz FTP, igual que ensure_dir() y cmd_list():
        # si dependiera del cwd de la sesión, un cwd heredado haría que
        # 'images/x.png' apunte a otro directorio del que uno cree.
        full = f"/{base.strip('/')}/{rel.strip('/')}"
        # La barra final es la forma de declarar "esto es un directorio": no la
        # adivinamos, porque un SIZE sobre un directorio responde distinto en
        # cada server y confundirse de tipo significa llamar al comando equivocado.
        if rel.endswith("/"):
            plan.append((rel, full, "dir", None, remote_dir_existe(ftp, full)))
        else:
            size = remote_size(ftp, full)
            plan.append((rel, full, "file", size, size is not None))

    presentes = [p for p in plan if p[4]]
    ausentes = [p for p in plan if not p[4]]
    total_bytes = sum(p[3] or 0 for p in presentes if p[2] == "file")

    for rel, _full, tipo, size, _ok in presentes:
        etiqueta = "(directorio)" if tipo == "dir" else f"{size:>12,} bytes"
        print(f"  BORRAR   {etiqueta}  {base}/{rel}")
    for rel, _full, _tipo, _size, _ok in ausentes:
        # No es error fatal: la lista se corre más de una vez y lo ya borrado
        # queda igual escrito, como registro de qué se sacó.
        print(f"  ausente  {'(ya no está)':>12}  {base}/{rel}")

    if not presentes:
        print("\nNinguna de las rutas existe en el server. No hay nada para borrar.")
        return

    print(
        f"\nTotal a liberar: {total_bytes:,} bytes "
        f"({total_bytes / 1024 / 1024:.1f} MB) en {len(presentes)} entradas."
    )

    # --- Fase 2: confirmación humana explícita. ---
    if not sys.stdin.isatty():
        sys.exit(
            "🛑 ABORTADO: prune necesita confirmación interactiva y no hay terminal.\n"
            "   No se corre desatendido ni desde un pipe a propósito."
        )
    print("\nEscribí BORRAR (en mayúsculas) para confirmar, o cualquier otra cosa para salir.")
    try:
        respuesta = input("> ").strip()
    except (EOFError, KeyboardInterrupt):
        respuesta = ""
    if respuesta != "BORRAR":
        print("Cancelado: no se borró nada.")
        return

    # --- Fase 3: borrar y verificar una por una. ---
    print()
    borrados, fallidos = 0, 0
    for rel, full, tipo, _size, _ok in presentes:
        try:
            if tipo == "dir":
                ftp.rmd(full)  # sólo directorios vacíos: si tiene contenido, falla y avisa.
            else:
                ftp.delete(full)
        except ftplib.all_errors as e:
            fallidos += 1
            print(f"  ⚠️  falló  {base}/{rel}: {e}")
            continue
        # Verificar contra el server, no confiar en que el comando no tiró error:
        # algunos servers responden 250 y no borran nada.
        sigue = remote_dir_existe(ftp, full) if tipo == "dir" else remote_size(ftp, full) is not None
        if sigue:
            fallidos += 1
            print(f"  ⚠️  el server aceptó el borrado pero {base}/{rel} SIGUE existiendo")
        else:
            borrados += 1
            print(f"  ✅ borrado y verificado  {base}/{rel}")

    print(f"\n✅ {borrados} entradas borradas y verificadas, {fallidos} con problemas.")
    if ausentes:
        print(f"   ({len(ausentes)} de la lista ya no estaban en el server)")


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
    # "wp-archive-DEPRECADO" en vez de "backup": el nombre viejo era corto y
    # sonaba inofensivo justo para la acción más destructiva del script.
    ap.add_argument(
        "action", choices=["list", "upload", "prune", "wp-archive-DEPRECADO"]
    )
    args = ap.parse_args()
    creds = load_creds(args.creds)
    ftp = connect(creds)
    try:
        if args.action == "list":
            cmd_list(ftp, creds)
        elif args.action == "upload":
            cmd_upload(ftp, creds)
        elif args.action == "prune":
            cmd_prune(ftp, creds)
        else:
            cmd_backup(ftp, creds)
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()


if __name__ == "__main__":
    main()
