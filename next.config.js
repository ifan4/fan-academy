/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      webpack: (config) => {
          config.module.rules.push({
            test: /\.node/,
            use: 'raw-loader',
          });
        return config;
      },
}

module.exports = nextConfig
