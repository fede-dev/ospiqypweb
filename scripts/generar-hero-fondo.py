#!/usr/bin/env python3
"""
Genera el fondo del hero de OSPIQyP (SIN texto incrustado) en 2 versiones:
  - hero-fondo.png         -> horizontal (16:9), para escritorio
  - hero-fondo-mobile.png  -> vertical (4:5), para celular

El texto lo pone el HTML del sitio encima (editable y mejor para SEO).

Uso:
    cd ~/Desktop/DESKTOP/ospiqyp
    export FAL_KEY="tu-clave-real"
    python3 scripts/generar-hero-fondo.py

Costo: ~USD 0.30 (2 imágenes).
"""

import os
import sys
import pathlib
import urllib.request

MODELO = "fal-ai/gemini-3-pro-image-preview"  # Nano Banana Pro
CARPETA_SALIDA = pathlib.Path(__file__).parent.parent / "public" / "images" / "banners"

BASE = (
    "hero background photograph for an Argentine health insurance company (obra social). "
    "A warm, reassuring scene of a happy multigenerational Latin American family together with a "
    "friendly female doctor in a bright modern clinic, soft natural lighting, photorealistic, "
    "professional advertising photography. Deep institutional blue (#003d7a) and white palette. "
    "IMPORTANT: do NOT include any text, letters, words, logos or watermarks anywhere in the image."
)

VERSIONES = [
    {
        "archivo": "hero-fondo.png",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Wide horizontal {BASE} Composition: keep the people on the RIGHT two-thirds and leave "
            "the LEFT third calmer (clinic wall / soft blurred background) for text overlay."
        ),
    },
    {
        "archivo": "hero-fondo-mobile.png",
        "aspect_ratio": "4:5",
        "prompt": (
            f"Vertical portrait {BASE} Composition: place the family and doctor in the LOWER half of the "
            "frame, centered, and leave the UPPER half calmer (clinic ceiling / soft blurred background) "
            "for text overlay at the top."
        ),
    },
]

def main():
    from _fal import cargar_fal_key
    cargar_fal_key()  # lee la clave de scripts/fal_key.txt (o de FAL_KEY)

    try:
        import fal_client
    except ImportError:
        print("❌ Falta fal-client. Instalalo con:  pip3 install --user fal-client")
        sys.exit(1)

    CARPETA_SALIDA.mkdir(parents=True, exist_ok=True)
    print(f"🎨 Generando {len(VERSIONES)} versiones del fondo del hero...\n")

    for i, v in enumerate(VERSIONES, 1):
        print(f"[{i}/{len(VERSIONES)}] Generando '{v['archivo']}' ({v['aspect_ratio']})...")
        resultado = fal_client.subscribe(
            MODELO,
            arguments={
                "prompt": v["prompt"],
                "aspect_ratio": v["aspect_ratio"],
                "resolution": "2K",
                "num_images": 1,
                "output_format": "png",
            },
            with_logs=False,
        )
        imagenes = resultado.get("images", [])
        if not imagenes:
            print("   ⚠️ No se devolvió imagen.")
            continue
        destino = CARPETA_SALIDA / v["archivo"]
        urllib.request.urlretrieve(imagenes[0]["url"], destino)
        print(f"   ✅ Guardado en: {destino}\n")

    print("🎉 Listo. Ahora corré:  npm run dev")


if __name__ == "__main__":
    main()
