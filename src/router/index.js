import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Asesor from '@/components/Asesor/Asesor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        forAuth: true
      }
    },
    {
    	path: '/login',
    	component: Login,
      meta: {
        forVisitors: true
      }
    }, 
    {
      path: '/asesor',
      name: 'Asesor',
      component: Asesor,
      meta: {
        forAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
