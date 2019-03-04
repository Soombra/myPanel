const mongoose = require('mongoose')
const {articleSchema, authSchema} = require('../schemas')

const articleModel = mongoose.model('article', articleSchema)
const authModel = mongoose.model('auth', authSchema)

module.exports = {
  articleModel,
  authModel
}
