const {qiniu_AccessKey, qiniu_SecretKey, port} = require('../../config')
const qiniu = require('qiniu')
const {articleModel} = require('../models')

const controllers = {
  getQiniuToken (req, res, next) {
    let mac = new qiniu.auth.digest.Mac(qiniu_AccessKey, qiniu_SecretKey)
    let putPolicy = new qiniu.rs.PutPolicy({scope: 'sombra'})
    var uploadToken = putPolicy.uploadToken(mac)
    res.send({token: uploadToken})
  },
  queryArticles (req, res, next) {
    articleModel.find((err, articles) => {
      if (err) {
        console.log(err)
        return
      }
      res.send(articles)
    })
  },
  createArticle (req, res, next) {
    const {body: {title, content}} = req
    console.log(title, content)
    if(title && content){
      let article = new articleModel({title, content})
      article.save(function(err, article){
        if(err){
          console.log(err)
        } else {
          res.send(article)
        }
      })
    } else {
      res.status(400).send('Bad Request');
    }
  },
  articleDetails (req, res) {
    let _id = req.params.id
    articleModel.findOne({_id}, (err, article) => {
      if(err){
        console.log(err)
        return
      }
      res.send(article)
    })
  }
}

module.exports = controllers
