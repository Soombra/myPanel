const moment = require ('moment')
const {travelArticleModel} = require ('../models')

const controllers = {
  async queryArticles (req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.per_page || 10
    try {
      const totalCount = await travelArticleModel.countDocuments()
      const articles = await travelArticleModel.find ({}, 'title date_created date_published status', {sort:{date_created: -1}, limit, skip: limit * (page - 1)})
      res.set('x-total-count', totalCount).send(articles)
    } catch (e) {
      console.log(e)
      res.status(500).send('出了点错误')
    }

  },
  createArticle (req, res, next) {
    const {body: {title, abstract, content}} = req
    if (title && content) {
      let article = new travelArticleModel ({title, abstract, content})
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
    travelArticleModel.findOne ({_id}, (err, article) => {
      if (err) {
        console.log (err)
        return
      }
      const {date_created, date_updated, title, abstract, content, image} = article
      res.send ({
        date_created: moment (date_created).format ('YYYY-MM-DD HH:mm:ss'),
        date_updated: moment (date_updated).format ('YYYY-MM-DD HH:mm:ss'),
        title,
        content,
        image,
        abstract
      })
    })
  },
  modifyArticle (req, res, next) {
    const {body: {title, abstract, content, image}, params: {id}} = req
    travelArticleModel.update({_id: id}, {title, abstract, content, image}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('修改成功')
    })
  },
  deleteArticle (req, res, next) {
    const _id = req.params.id
    travelArticleModel.remove({_id}, (err, docs) => {
      if(err){
        console.log(err)
        res.status(400).send('Bad Request')
      }
      res.status(204).send('修改成功:' + docs)
    })
  },
  publishArticle (req, res, next) {
    const _id = req.params.id
    travelArticleModel.update({_id}, {status: 'published', date_published: new Date()}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('发布成功')
    })
  },
  unpublishArticle (req, res, next) {
    const _id = req.params.id
    travelArticleModel.update({_id}, {status: 'offline'}, (err, article) => {
      if(err){
        console.log (err)
        res.status(400).send('Bad Request')
      }
      res.status(201).send('取消发布成功')
    })
  },
}

module.exports = controllers
