import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Asesor from '@/components/Asesor/Asesor'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/login',
    	component: Login
    }, 
    {
      path: '/asesor',
      name: 'Asesor',
      component: Asesor
    },
  ]
})
