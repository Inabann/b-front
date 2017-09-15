import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import Asesor from '@/components/Asesor/Asesor'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        forVisitors: true
      }
    }, 
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { forAuth : true },
      children: [
        {
          path: 'asesores',
          component: Asesor,
          meta: { forAdmin : true}
        },
        {
          path: 'dashboard',
          component: Dashboard,
          meta: { forAuth : true}
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
