/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // 暫時
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
}

const fs = require('fs')
const getDirectories = source =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => `@chakra-ui/${dirent.name}`)

const arr = getDirectories('node_modules/@chakra-ui')
const withTM = require('next-transpile-modules')([...arr]) // pass the modules you would like to see transpiled

module.exports = withTM(nextConfig)
