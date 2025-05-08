/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@uniswap/sdk-core',
    '@uniswap/universal-router-sdk'
  ],
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify')
    };
    return config;
  }
};

module.exports = nextConfig;
