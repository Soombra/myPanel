const {qiniu_AccessKey, qiniu_SecretKey, port} = require('../../config')
const qiniu = require('qiniu')

const controllers = function (app) {
  app.get('/get_token', (req, res, next) => {
    let mac = new qiniu.auth.digest.Mac(qiniu_AccessKey, qiniu_SecretKey)
    let putPolicy = new qiniu.rs.PutPolicy({scope: 'sombra'})
    var uploadToken = putPolicy.uploadToken(mac)
    res.send({token: uploadToken})
  })
}

module.exports = controllers
