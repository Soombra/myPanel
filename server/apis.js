const controllers = require ('./controllers')
const apis = function (app) {
  app.get ('/get_qiniu_token', controllers.checkAuth, controllers.getQiniuToken)
  app.post('/login', controllers.login)
  app.get('/front-end/articles', controllers.checkAuth, controllers.queryFrontArticles)
  app.post ('/front-end/article', controllers.checkAuth, controllers.createFrontArticle)
  app.get ('/front-end/article/:id', controllers.checkAuth, controllers.frontArticleDetails)
  app.get('/travel/articles', controllers.checkAuth, controllers.queryTravelArticles)
  app.post ('/travel/article', controllers.checkAuth, controllers.createTravelArticle)
  app.get ('/travel/article/:id', controllers.checkAuth, controllers.travelArticleDetails)
  app.get('/essay/articles', controllers.checkAuth, controllers.queryEssayArticles)
  app.post ('/essay/article', controllers.checkAuth, controllers.createEssayArticle)
  app.get ('/essay/article/:id', controllers.checkAuth, controllers.essayArticleDetails)
}
module.exports = apis
