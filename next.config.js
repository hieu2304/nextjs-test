/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    domains: ['supermomos-app-resources-us.s3.amazonaws.com']
  }
}

module.exports = nextConfig
