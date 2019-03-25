import Router from 'vue-router'
import Vue from 'vue'
import frontEndArticle from '../pages/front-end/article'
import travelArticle from '../pages/travel/article'
import essayArticle from '../pages/essay/article'
import fontEndList from '../pages/front-end/list'
import travelList from '../pages/travel/list'
import essayList from '../pages/essay/list'
import login from '../pages/login'
import index from '../pages/index'

Vue.use (Router)

export default new Router ({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    children: [
      {
        path: '',
        component: fontEndList
      },
      {
        path: '/front-end-list',
        name: 'front-end-list',
        component: fontEndList
      },
      {
        path: '/travel-list',
        name: 'travel-list',
        component: travelList
      }, {
        path: '/essay-list',
        name: 'essay-list',
        component: essayList
      }, {
        path: '/front-end/article/:id',
        name: 'frontEndArticle',
        component: frontEndArticle
      },
      {
        path: '/travel/article/:id',
        name: 'travelArticle',
        component: travelArticle
      },
      {
        path: '/essay/article/:id',
        name: 'essayArticle',
        component: essayArticle
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: login
  }]
})
