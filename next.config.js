/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com']
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/appspecific/com.chrome.devtools.json',
        destination: '/404', // Renvoie une page 404 standard
      }
    ]
  },
  // Configuration Webpack optimisée
  webpack: (config, { isServer }) => {
    // Solution pour les erreurs de chunks
    config.resolve.fallback = { 
      fs: false,
      net: false,
      tls: false
    };

    // Optimisation du découpage des chunks
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 244 * 1024, // 244KB
      minSize: 20 * 1024 // 20KB
    };

    // Important: Retourner la config modifiée
    return config;
  },

  // Configuration des en-têtes HTTP
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/_next/static/chunks/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Option de performance (disponible dans la plupart des versions)
  staticPageGenerationTimeout: 300,
};

module.exports = nextConfig;