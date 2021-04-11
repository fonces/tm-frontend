const path = require('path');

require('dotenv').config();

module.exports = {
  assetPrefix: process.env.GITHUB_PAGES ? '/tm-frontend' : '',
  env: {
    endPoint: process.env.ENDPOINT
  },
  webpack(config, options) {
    config.resolve.alias['@'] = path.join(__dirname, './')
    return config
  },
};
