/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async headers() {
    return [
      {
        // Allow embedding from dashboard for visual editor
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOW-FROM https://app.upgradeshop.ai',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://app.upgradeshop.ai https://app.staging.upgradeshop.ai",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
