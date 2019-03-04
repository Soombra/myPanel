import Router from 'vue-router'
import Vue from 'vue'
import article from '../pages/article'
import list from '../pages/front-end-list'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'list',
    component: list
  },{
    path: '/article/:id',
    name: 'article',
    component: article
  }]
})
