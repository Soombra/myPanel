const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
  title: String,
  content: String
})
const authSchema = mongoose.Schema({
  username: String,
  password: String
})

module.exports = {
  articleSchema,
  authSchema
}
