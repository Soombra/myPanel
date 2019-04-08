const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.dev.conf')
const webpackBaseConfig = require('../webpack/webpack.base.conf')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const apis = require('./apis')
const {port} = require('../config')
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/mySpace";

let connection = mongoose.connection
connection.once('open', function () {
  console.log('数据库链接成功')
})
mongoose.connect(url, {useNewUrlParser: true})

const app = express()
app.use(bodyParser())
app.use(cookieParser())
app.use(history())
apis(app)

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
