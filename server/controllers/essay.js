const moment = require ('moment')
const {essayArticleModel} = require ('../models')

const controllers = {
  async queryArticles (req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.per_page || 10
    try {
      const totalCount = await essayArticleModel.countDocuments()
      const articles = await essayArticleModel.find ({}, 'title date_created date_published status', {sort:{date_created: -1}, limit, skip: limit * (page - 1)})
      res.set('x-total-count', totalCount).send(articles)
    } catch (e) {
      console.log(e)
      res.status(500).send('出了点错误')
    }

  },
  createArticle (req, res, next) {
    const {body: {title, abstract, content, image, tags}} = req
    if (title && content) {
      let article = new essayArticleModel ({title, abstract, content, image, tags})
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
    essayArticleModel.findOne ({_id}, (err, article) => {
      if (err) {
        console.log (err)
        return
      }
      const {date_created, date_updated, title, abstract, content, image, tags} = article
      res.send ({
        date_created: moment (date_created).format ('YYYY-MM-DD HH:mm:ss'),
        date_updated: moment (date_updated).format ('YYYY-MM-DD HH:mm:ss'),
        title,
        content,
        image,
        abstract,
        tags
      })
    })
  },
  modifyArticle (req, res, next) {
    const {body: {title, abstract, content, image, tags}, params: {id}} = req
    essayArticleModel.update({_id: id}, {title, abstract, content, image, tags}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('修改成功')
    })
  },
  deleteArticle (req, res, next) {
    const _id = req.params.id
    essayArticleModel.remove({_id}, (err, docs) => {
      if(err){
        console.log(err)
        res.status(400).send('Bad Request')
      }
      res.status(204).send('修改成功:' + docs)
    })
  },
  publishArticle (req, res, next) {
    const _id = req.params.id
    essayArticleModel.update({_id}, {status: 'published', date_published: new Date()}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('发布成功')
    })
  },
  unpublishArticle (req, res, next) {
    const _id = req.params.id
    essayArticleModel.update({_id}, {status: 'offline'}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('取消发布成功')
    })
  },
}

module.exports = controllers
