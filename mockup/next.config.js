/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'commonjs canvas',
      });
    }
    
    return config;
  },
}

module.exports = nextConfig
