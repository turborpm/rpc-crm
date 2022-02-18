/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com", "lh3.googleusercontent.com"],
    minimumCacheTTL: 6000000,
  },
};

module.exports = nextConfig;
