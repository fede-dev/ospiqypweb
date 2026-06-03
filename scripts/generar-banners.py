#!/usr/bin/env python3
"""
Generador de banners para OSPIQyP usando Nano Banana Pro (Gemini 3 Pro Image) vía fal.ai.

Cómo usarlo (paso a paso):
  1) Instalá la librería de fal (una sola vez):
        pip3 install --user fal-client
  2) Cargá tu API key de fal.ai en la terminal (reemplazá por la tuya):
        export FAL_KEY="tu_api_key_de_fal"
  3) Corré el script:
        python3 scripts/generar-banners.py
  4) Las imágenes se guardan en: public/images/banners/

Costo aproximado: ~USD 0.15 por imagen. Este script genera 3 banners = ~USD 0.45.
"""

import os
import sys
import json
import pathlib
import urllib.request

# --- Configuración general ----------------------------------------------------

MODELO = "fal-ai/gemini-3-pro-image-preview"  # Nano Banana Pro
CARPETA_SALIDA = pathlib.Path(__file__).parent.parent / "public" / "images" / "banners"

# Paleta de marca OSPIQyP (la inyectamos en cada prompt para que sea on-brand)
MARCA = (
    "Institutional Argentine health insurance brand 'OSPIQyP'. "
    "Color palette: deep institutional blue (#003d7a and #0056a8), clean white, "
    "and a green health accent (#2e7d32). Clean, modern, corporate, trustworthy, "
    "professional medical look. Soft natural lighting. No watermark, no logos of other brands."
)

# --- Definición de los banners a generar -------------------------------------
# Podés agregar, sacar o editar entradas de esta lista libremente.

BANNERS = [
    {
        "archivo": "hero-principal.png",
        "aspect_ratio": "16:9",
        "prompt": (
            f"{MARCA} Wide website hero banner. A warm, reassuring scene of a happy "
            "multigenerational Latin American family together with a friendly doctor in a "
            "bright modern clinic. Composition with clean empty space on the LEFT side for text. "
            "On that left area, render a bold white headline text reading exactly "
            "\"Tu salud es nuestro compromiso\" and below it smaller text reading \"OSPIQyP\". "
            "Photorealistic, high quality professional advertising photography."
        ),
    },
    {
        "archivo": "coberturas.png",
        "aspect_ratio": "16:9",
        "prompt": (
            f"{MARCA} Wide website banner about medical coverage. A professional doctor and a "
            "smiling patient in a modern consultation room, sense of care and protection. "
            "Clean empty space for text on the right. Render bold white headline text reading "
            "exactly \"Cobertura médica integral\" with a smaller line \"Red nacional de prestadores\". "
            "Photorealistic, corporate healthcare style."
        ),
    },
    {
        "archivo": "social-cuadrado.png",
        "aspect_ratio": "1:1",
        "prompt": (
            f"{MARCA} Square social media post for a health insurance company. Clean modern "
            "graphic design with a subtle medical/health motif (shield, heartbeat, family silhouette) "
            "over a deep blue background with green accents. Centered bold white text reading exactly "
            "\"OSPIQyP\" and below it \"Tu obra social de confianza\". Minimalist, elegant, professional."
        ),
    },
]

# --- Lógica -------------------------------------------------------------------

def main():
    from _fal import cargar_fal_key
    cargar_fal_key()  # lee la clave de scripts/fal_key.txt (o de FAL_KEY)

    try:
        import fal_client
    except ImportError:
        print("❌ Falta la librería de fal. Instalala con:")
        print("   pip3 install --user fal-client")
        sys.exit(1)

    CARPETA_SALIDA.mkdir(parents=True, exist_ok=True)
    print(f"🎨 Generando {len(BANNERS)} banners con Nano Banana Pro...\n")

    for i, banner in enumerate(BANNERS, 1):
        nombre = banner["archivo"]
        print(f"[{i}/{len(BANNERS)}] Generando '{nombre}' ({banner['aspect_ratio']})...")

        resultado = fal_client.subscribe(
            MODELO,
            arguments={
                "prompt": banner["prompt"],
                "aspect_ratio": banner["aspect_ratio"],
                "resolution": "2K",
                "num_images": 1,
                "output_format": "png",
            },
            with_logs=False,
        )

        imagenes = resultado.get("images", [])
        if not imagenes:
            print(f"   ⚠️  No se devolvió imagen. Respuesta: {json.dumps(resultado)[:300]}")
            continue

        url = imagenes[0]["url"]
        destino = CARPETA_SALIDA / nombre
        urllib.request.urlretrieve(url, destino)
        print(f"   ✅ Guardado en: {destino}\n")

    print("🎉 Listo. Revisá la carpeta public/images/banners/")


if __name__ == "__main__":
    main()
