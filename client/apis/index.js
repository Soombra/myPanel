import request from '../request'

export const frontEnd = {
  createArticle (params) {
    return request.post ('/front-end/article', params)
  },
  queryArticles () {
    return request.get('/front-end/articles')
  },
  getArticle (id) {
    return request.get(`/front-end/article/${id}`)
  },
  modifyArticle (id, params) {
    return request.put(`/front-end/article/${id}`, params)
  },
  publishArticle (id) {
    return request.put(`/front-end/article/${id}/publish`)
  },
  unPublishArticle (id) {
    return request.put(`/front-end/article/${id}/unpublish`)
  },
  deleteArticle (id) {
    return request.delete(`/front-end/article/${id}`)
  }
}
export const travel = {
  createArticle (params) {
    return request.post ('/travel/article', params)
  },
  queryArticles () {
    return request.get('/travel/articles')
  },
  getArticle (id) {
    return request.get(`/travel/article/${id}`)
  },
  modifyArticle (id, params) {
    return request.put(`/travel/article/${id}`, params)
  }
}
export const essay = {
  createArticle (params) {
    return request.post ('/essay/article', params)
  },
  queryArticles () {
    return request.get('/essay/articles')
  },
  getArticle (id) {
    return request.get(`/essay/article/${id}`)
  },
  modifyArticle (id, params) {
    return request.put(`/essay/article/${id}`, params)
  }
}

export default {
  frontEnd,
  travel,
  essay
}
