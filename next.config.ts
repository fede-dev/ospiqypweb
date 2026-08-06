import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Export estático para hosting tipo cPanel (Apache, sin Node): genera /out con HTML plano.
  output: "export",
  // next/image necesita unoptimized en export (no hay servidor que optimice on-demand).
  images: { unoptimized: true },
  // URLs como /contacto/ → carpeta con index.html, así Apache las sirve sin reglas extra.
  trailingSlash: true,
  // Silenciar warning sobre múltiples lockfiles (hay uno en ~/ que no es nuestro).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
