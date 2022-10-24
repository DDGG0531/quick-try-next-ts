/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  typescript: {
    // 暫時
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  webpack: config => {
    config.optimization.minimize = false
    return config
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

// const packageJSON = require('./package.json')
// const transpiledPackages = Object.keys(packageJSON.dependencies).filter(it =>
//   it.includes('@chakra-ui/')
// )
// const withTM = require('next-transpile-modules')(transpiledPackages)

module.exports = withTM(nextConfig)
