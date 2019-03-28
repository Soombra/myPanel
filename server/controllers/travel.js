const moment = require ('moment')
const {travelArticleModel} = require ('../models')

const controllers = {
  queryArticles (req, res, next) {
    travelArticleModel.find ((err, articles) => {
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
      let article = new travelArticleModel ({title, content})
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
    travelArticleModel.findOne ({_id}, (err, article) => {
      if (err) {
        console.log (err)
        return
      }
      res.send (article)
    })
  }
}

module.exports = controllers
