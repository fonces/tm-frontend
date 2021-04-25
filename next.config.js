const withPWA = require('next-pwa')
const path = require('path')

const BASE_PATH = process.env.GITHUB_PAGES ? '/tm-frontend' : ''
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

module.exports = withPWA({
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  pwa: {
    dest: 'public',
    disable: IS_DEVELOPMENT,
  },
  env: {
    basePath: BASE_PATH,
    isDevelopment: IS_DEVELOPMENT,
  },
  webpack (config) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
})
