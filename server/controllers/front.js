const moment = require ('moment')
const {frontArticleModel} = require ('../models')

const controllers = {
  queryArticles (req, res, next) {
    frontArticleModel.find ((err, articles) => {
      if (err) {
        console.log (err)
        return
      }
      res.send (articles)
    })
  },
  createArticle (req, res, next) {
    const {body: {title, content}} = req
    console.log (title, content)
    if (title && content) {
      let article = new frontArticleModel ({title, content})
      article.save (function (err, article) {
        if (err) {
          console.log (err)
        } else {
          res.send (article)
        }
      })
    } else {
      res.status (400).send ('Bad Request');
    }
  },
  articleDetails (req, res) {
    let _id = req.params.id
    frontArticleModel.findOne ({_id}, (err, article) => {
      if (err) {
        console.log (err)
        return
      }
      const {date_created, date_updated, title, content, image} = article
      res.send ({
        date_created: moment (date_created).format ('YYYY-MM-DD HH:mm:ss'),
        date_updated: moment (date_updated).format ('YYYY-MM-DD HH:mm:ss'),
        title,
        content,
        image
      })
    })
  },
  modifyArticle (req, res, next) {},
  deleteArticle (req, res, next) {},
  publishArticle (req, res, next) {},
  unpublishArticle (req, res, next) {},
}

module.exports = controllers
