const controllers = require ('./controllers')
const apis = function (app) {
  app.get ('/get_qiniu_token', controllers.getQiniuToken)
  app.get('/articles', controllers.queryArticles)
  app.post ('/article', controllers.createArticle)
  app.get ('/article/:id', controllers.articleDetails)
}
module.exports = apis
