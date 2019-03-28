const moment = require ('moment')
const {frontArticleModel} = require ('../models')

const controllers = {
  async queryArticles (req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.per_page || 10
    try {
      const totalCount = await frontArticleModel.count()
      const articles = await frontArticleModel.find ({}, null, {sort:{date_created: -1}, limit, skip: limit * (page - 1)})
      console.log(articles)
      res.set('x-total-count', totalCount).send(articles)
    } catch (e) {
      console.log(e)
      res.status(500).send('出了点错误')
    }

  },
  createArticle (req, res, next) {
    const {body: {title, content}} = req
    console.log (req.body)
    if (title && content) {
      let article = new frontArticleModel ({title, content})
      article.save (function (err, article) {
        if (err) {
          console.log (err)
          res.status (500).send ('error');
        } else {
          res.status(201).send (article)
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
  modifyArticle (req, res, next) {
    const {body: {title, content, image}, params: {id}} = req
    frontArticleModel.update({_id: id}, {title, content, image}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('修改成功')
    })
  },
  deleteArticle (req, res, next) {
    const _id = req.params.id
    frontArticleModel.remove({_id}, (err, docs) => {
      if(err){
        console.log(err)
        res.status(400).send('Bad Request')
      }
      res.status(204).send('修改成功:' + docs)
    })
  },
  publishArticle (req, res, next) {
    const _id = req.params.id
    frontArticleModel.update({_id}, {status: 'published', date_published: new Date()}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('发布成功')
    })
  },
  unpublishArticle (req, res, next) {
    const _id = req.params.id
    frontArticleModel.update({_id}, {status: 'offline'}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('取消发布成功')
    })
  },
}

module.exports = controllers