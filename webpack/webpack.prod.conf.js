const baseConfig = require ('./webpack.base.conf')
const merge = require ('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const prodConfig = merge (baseConfig, {
  mode: 'production',
  plugins: []
})

module.exports = prodConfig
