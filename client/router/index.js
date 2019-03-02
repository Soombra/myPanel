import Router from 'vue-router'
import Vue from 'vue'
import articleDetails from '../pages/articleDetails'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'articleDetails',
    component: articleDetails
  }]
})
