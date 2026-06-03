import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Silenciar warning sobre múltiples lockfiles (hay uno en ~/ que no es nuestro).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
