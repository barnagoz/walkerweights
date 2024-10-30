/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{hostname: "walkerweights.hu"}, {hostname: "picsum.photos"}],
  },
};

module.exports = nextConfig;
