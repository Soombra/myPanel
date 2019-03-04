const mongoose = require('mongoose')
const articleSchema = require('../schemas')

const articleModel = mongoose.model('article', articleSchema)

module.exports = articleModel
