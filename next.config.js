const withPWA = require('next-pwa')
const path = require('path')

const BASE_PATH = process.env.GITHUB_PAGES ? '/tm-frontend' : ''

module.exports = withPWA({
  assetPrefix: BASE_PATH,
  env: {
    basePath: BASE_PATH,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  webpack (config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
})
