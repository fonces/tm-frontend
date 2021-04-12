const path = require('path')

require('dotenv').config()

module.exports = {
  assetPrefix: process.env.GITHUB_PAGES ? '/tm-frontend' : '',
  env: {
    ssEndPoint: process.env.SS_ENDPOINT,
  },
  webpack (config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
}
