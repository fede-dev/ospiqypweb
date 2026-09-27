"""
Helper compartido: carga la clave de fal.ai de forma robusta.
Busca la clave en este orden:
  1) variable de entorno FAL_KEY
  2) archivo scripts/fal_key.txt
Limpia comillas y espacios, y avisa si parece incompleta.
"""

import os
import sys
import pathlib


def cargar_fal_key():
    key = os.environ.get("FAL_KEY", "").strip()

    # Si el env está vacío o tiene el texto de ejemplo, leemos del archivo.
    if not key or key in ("tu-clave-real", "TU_API_KEY_ACA"):
        archivo = pathlib.Path(__file__).parent / "fal_key.txt"
        if archivo.exists():
            # Tomamos la primera línea que no sea comentario ni esté vacía.
            for linea in archivo.read_text(encoding="utf-8").splitlines():
                linea = linea.strip()
                if linea and not linea.startswith("#"):
                    key = linea
                    break

    # Limpieza: sacamos comillas y espacios que se cuelan al copiar.
    key = key.strip().strip('"').strip("'").strip()

    if not key or key.startswith("PEGA_") or key in ("tu-clave-real", "TU_API_KEY_ACA"):
        print("❌ No encontré tu clave de fal.ai.")
        print("   → Abrí el archivo  scripts/fal_key.txt , pegá tu clave COMPLETA y guardá.")
        sys.exit(1)

    os.environ["FAL_KEY"] = key

    # Diagnóstico enmascarado (no muestra la clave entera).
    mascara = (key[:6] + "…" + key[-4:]) if len(key) > 12 else "(muy corta)"
    tiene_colon = ":" in key
    print(f"🔑 Clave detectada: {mascara}  (largo={len(key)}, contiene ':'={tiene_colon})")
    if not tiene_colon:
        print("   ⚠️ Las claves de fal suelen llevar un ':' en el medio. Quizás copiaste solo una parte.")
    return key
