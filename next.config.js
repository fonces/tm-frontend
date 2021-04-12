const path = require('path')

module.exports = {
  assetPrefix: process.env.GITHUB_PAGES ? '/tm-frontend' : '',
  webpack (config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
}
