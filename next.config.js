/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          net: false,
          tls: false,
          fs: false,
          http: require.resolve("stream-http"), // Polyfill for HTTP
          https: require.resolve("https-browserify"), // Polyfill for HTTPS
        };
      }
  
      return config;
    },
  };
  
  module.exports = nextConfig;
  