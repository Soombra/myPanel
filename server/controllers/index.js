const {qiniu_AccessKey, qiniu_SecretKey, port} = require('../../config')
const qiniu = require('qiniu')
const articleModel = require('../models')

const controllers = {
  getQiniuToken (req, res, next) {
    let mac = new qiniu.auth.digest.Mac(qiniu_AccessKey, qiniu_SecretKey)
    let putPolicy = new qiniu.rs.PutPolicy({scope: 'sombra'})
    var uploadToken = putPolicy.uploadToken(mac)
    res.send({token: uploadToken})
  },
  createArticle (req, res, next) {
    const {body: {title, content}} = req
    if(title && content){
      let article = new articleModel({title, content})
      article.save(function(err, article){
        if(err){
          console.log(err)
        } else {
          res.send('ok')
        }
      })
    } else {
      res.status(400).send('Bad Request');
    }
  }
}

module.exports = controllers
