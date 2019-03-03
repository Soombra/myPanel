const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.dev.conf')
const webpackBaseConfig = require('../webpack/webpack.base.conf')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const controllers = require('./controllers')
const {port} = require('../config')

const app = express()

controllers(app)

const isDev = process.env.NODE_ENV !== 'production'
if (isDev) {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackBaseConfig.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(express.static('dist'))
app.listen(port, () => {
  console.log('服务器运行在' + port)
})
