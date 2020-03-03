import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueLazyLoad from 'vue-lazyload'
import '../node_modules/semantic-ui-css/semantic.min.css'
import 'normalize.css'
import './assets/style/iconfont.css'
import loadPng from './assets/image/no-result@3x.png'

Vue.use(VueLazyLoad, {
  loading: loadPng,
  preLoad: 1.3
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
