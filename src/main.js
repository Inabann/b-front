// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './services/Auth.js'
import axios from 'axios'
import VueAxios from 'vue-axios'

import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Buefy)
Vue.use(Auth)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
