const withPWA = require('next-pwa')
const path = require('path')

const BASE_PATH = process.env.GITHUB_PAGES ? '/tm-frontend' : ''

module.exports = withPWA({
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  env: {
    basePath: BASE_PATH,
  },
  webpack (config) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
})
