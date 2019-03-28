import Vue from 'vue'
import App from './app'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'

Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
