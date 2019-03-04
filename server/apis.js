const controllers = require ('./controllers')
const apis = function (app) {
  app.get ('/get_qiniu_token', controllers.checkAuth, controllers.getQiniuToken)
  app.get('/articles', controllers.checkAuth, controllers.queryArticles)
  app.post ('/article', controllers.checkAuth, controllers.createArticle)
  app.get ('/article/:id', controllers.articleDetails)
  app.post('/login', controllers.login)
}
module.exports = apis
