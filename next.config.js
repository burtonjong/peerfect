/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          net: false,
          tls: false,
          child_process: false,
          "node:events": false, // Ignore node-specific modules
          http: require.resolve("stream-http"),
          https: require.resolve("https-browserify"),
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  