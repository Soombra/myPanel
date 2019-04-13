const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  date_published: Date,
  abstract: String,
  tags: {
    type: Array,
    default: []
  },
  status: {
    type: String,
    default: 'draft'
  }
}, {
  timestamps: { createdAt: 'date_created', updatedAt: 'date_updated' }
})
const userSchema = mongoose.Schema({
  username: String,
  password: String
})

module.exports = {
  articleSchema,
  userSchema
}
