/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@uniswap/sdk-core',
    '@uniswap/universal-router-sdk',
    'viem',
    'wagmi'
  ],
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      '@uniswap/universal-router-sdk',
      'viem',
      'wagmi'
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser')
    };
    return config;
  }
};

module.exports = nextConfig;
