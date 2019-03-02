const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.dev.conf')
const webpackBaseConfig = require('../webpack/webpack.base.conf')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const qiniu = require('qiniu')
const {qiniu_AccessKey, qiniu_SecretKey, port} = require('../config')

const app = express()

app.get('/get_token', (req, res, next) => {
  let mac = new qiniu.auth.digest.Mac(qiniu_AccessKey, qiniu_SecretKey)
  let putPolicy = new qiniu.rs.PutPolicy({scope: 'sombra'})
  var uploadToken = putPolicy.uploadToken(mac)
  res.send({token: uploadToken})
})

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
