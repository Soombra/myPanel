import axios from 'axios'

export function createArticle (params) {
  return axios.post ('/article', params)
}

export default {
  createArticle
}
