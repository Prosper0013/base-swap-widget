/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required for Uniswap SDK and other ESM packages
  transpilePackages: [
    '@uniswap/sdk-core',
    '@uniswap/universal-router-sdk',
    '@uniswap/v3-sdk',
    'viem',
    'wagmi'
  ],
  // Enable ESM support
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['@uniswap/universal-router-sdk']
  },
  // Fix Webpack 5 polyfills
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false
    };
    return config;
  },
  // Enable static exports if needed
  output: 'standalone',
  // Environment variables (optional)
  env: {
    NEXT_PUBLIC_WC_ID: process.env.NEXT_PUBLIC_WC_ID,
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID
  }
};

module.exports = nextConfig;
