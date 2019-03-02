const baseConfig = require ('./webpack.base.conf')
const webpack = require('webpack')
const merge = require ('webpack-merge')
const devConfig = merge (baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = devConfig
