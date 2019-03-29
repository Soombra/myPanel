const authController = require ('./controllers/auth')
const frontController = require ('./controllers/front')
const travelController = require ('./controllers/travel')
const essayController = require ('./controllers/essay')
const apis = function (app) {
  app.get ('/get_qiniu_token', authController.checkAuth, authController.getQiniuToken)
  app.post('/login', authController.login)
  app.get('/front-end/articles', authController.checkAuth, frontController.queryArticles)
  app.post ('/front-end/article', authController.checkAuth, frontController.createArticle)
  app.get ('/front-end/article/:id', authController.checkAuth, frontController.articleDetails)
  app.put ('/front-end/article/:id', authController.checkAuth, frontController.modifyArticle)
  app.delete ('/front-end/article/:id', authController.checkAuth, frontController.deleteArticle)
  app.put ('/front-end/article/:id/publish', authController.checkAuth, frontController.publishArticle)
  app.put ('/front-end/article/:id/unpublish', authController.checkAuth, frontController.unpublishArticle)

  app.get('/travel/articles', authController.checkAuth, travelController.queryArticles)
  app.post ('/travel/article', authController.checkAuth, travelController.createArticle)
  app.get ('/travel/article/:id', authController.checkAuth, travelController.articleDetails)
  app.put ('/travel/article/:id', authController.checkAuth, travelController.modifyArticle)
  app.delete ('/travel/article/:id', authController.checkAuth, travelController.deleteArticle)
  app.put ('/travel/article/:id/publish', authController.checkAuth, travelController.publishArticle)
  app.put ('/travel/article/:id/unpublish', authController.checkAuth, travelController.unpublishArticle)

  app.get('/essay/articles', authController.checkAuth, essayController.queryArticles)
  app.post ('/essay/article', authController.checkAuth, essayController.createArticle)
  app.get ('/essay/article/:id', authController.checkAuth, essayController.articleDetails)
  app.put ('/essay/article/:id', authController.checkAuth, essayController.modifyArticle)
  app.delete ('/essay/article/:id', authController.checkAuth, essayController.deleteArticle)
  app.put ('/essay/article/:id/publish', authController.checkAuth, essayController.publishArticle)
  app.put ('/essay/article/:id/unpublish', authController.checkAuth, essayController.unpublishArticle)

}
module.exports = apis
