import request from '../request'

export const frontEnd = {
  createArticle (params) {
    return request.post('/front-end/article', params)
  },
  queryArticles (params) {
    return request.get('/front-end/articles', {params})
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
    return request.post('/travel/article', params)
  },
  queryArticles (params) {
    return request.get('/travel/articles', {params})
  },
  getArticle (id) {
    return request.get(`/travel/article/${id}`)
  },
  modifyArticle (id, params) {
    return request.put(`/travel/article/${id}`, params)
  },
  publishArticle (id) {
    return request.put(`/travel/article/${id}/publish`)
  },
  unPublishArticle (id) {
    return request.put(`/travel/article/${id}/unpublish`)
  },
  deleteArticle (id) {
    return request.delete(`/travel/article/${id}`)
  }
}
export const essay = {
  createArticle (params) {
    return request.post('/essay/article', params)
  },
  queryArticles (params) {
    return request.get('/essay/articles', {params})
  },
  getArticle (id) {
    return request.get(`/essay/article/${id}`)
  },
  modifyArticle (id, params) {
    return request.put(`/essay/article/${id}`, params)
  },
  publishArticle (id) {
    return request.put(`/essay/article/${id}/publish`)
  },
  unPublishArticle (id) {
    return request.put(`/essay/article/${id}/unpublish`)
  },
  deleteArticle (id) {
    return request.delete(`/essay/article/${id}`)
  }
}
export const home = {
  createFootprint (params) {
    return request.post('/footprint', params)
  },
  queryFootprints (params) {
    return request.get('/footprints', {params})
  },
  deleteFootprint (id) {
    return request.delete(`/footprint/${id}`)
  },
}

export default {
  frontEnd,
  travel,
  essay,
  home
}
