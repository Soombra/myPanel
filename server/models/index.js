const mongoose = require('mongoose')
const {articleSchema, userSchema} = require('../schemas')

const frontArticleModel = mongoose.model('frontArticle', articleSchema)
const travelArticleModel = mongoose.model('travelArticle', articleSchema)
const essayArticleModel = mongoose.model('essayArticle', articleSchema)
const userModel = mongoose.model('user', userSchema)

module.exports = {
  frontArticleModel,
  travelArticleModel,
  essayArticleModel,
  userModel
}
