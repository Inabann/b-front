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
Vue.use(Buefy, { defaultIconPack: 'fa' })
Vue.use(Auth)

router.beforeEach(
	(to, from, next) => {
		if(to.matched.some(record => record.meta.forVisitors)) {
			if(Vue.auth.isAuthd()){
				if(to.path !== '/home/dashboard'){
					next('/home/dashboard')
				}
			} else{
				next()
			}
		} else {
			next()
		}
		if(to.matched.some(record => record.meta.forAuth)) {
			if(!Vue.auth.isAuthd()){
				if(to.path !== '/'){
					next('/')
				}
			} else{
				next()
			}
		} else {
			next()
		}
		if(to.matched.some(record => record.meta.forAdmin)){
			if(!Vue.auth.isAdmin()){
				if(to.path !== '/home/dashboard'){
					next('/home/dashboard')
				}
			} else{
				next()
			}
		} else {
			next()
		}
	}
);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
