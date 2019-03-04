const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
  title: String,
  content: String
})

module.exports = {
  articleSchema
}
