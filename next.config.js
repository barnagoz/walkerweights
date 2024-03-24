/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{hostname:"walkerweights.hu"}],
  },
};

module.exports = nextConfig;
