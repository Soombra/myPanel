const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
  title: String,
  content: String
})

module.export = articleSchema
