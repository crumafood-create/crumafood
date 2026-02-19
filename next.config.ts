import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ayuda a que las redirecciones de Mercado Pago sean más limpias
  trailingSlash: false,
  
  // Bloquea intentos de acceso a carpetas de WordPress que no existen
  async redirects() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: false,
      },
      {
        source: '/wordpress/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;