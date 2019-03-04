const controllers = require ('./controllers')
const apis = function (app) {
  app.get ('/get_qiniu_token', controllers.getQiniuToken)

  app.post ('/article', controllers.createArticle)
}
module.exports = apis
