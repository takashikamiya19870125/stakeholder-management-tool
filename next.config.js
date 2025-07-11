/** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // ローカル環境での動作を前提
    trailingSlash: true,

    // Netlify用の静的エクスポート対応
    output: 'export',
    distDir: 'out',
    images: {
      unoptimized: true,
    },

    // 開発用設定（静的エクスポート時は無効）
    ...(process.env.NODE_ENV === 'development' && {
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://localhost:3001/api/:path*',
          },
        ];
      },
    }),

    // セキュリティヘッダー
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  };

  module.exports = nextConfig;
