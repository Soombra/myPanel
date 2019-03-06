const mongoose = require('mongoose')
const {articleSchema, userSchema} = require('../schemas')

const articleModel = mongoose.model('article', articleSchema)
const userModel = mongoose.model('user', userSchema)

module.exports = {
  articleModel,
  userModel
}
