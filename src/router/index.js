import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Asesor from '@/components/Asesor/Asesor'
import Plan from '@/components/Plan/Plan'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        forVisitors: true
      }
    }, 
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        forAuth: true
      },
      children: [
        {
          path: 'plan',
          component: Plan
        },
        {
          path: 'asesor',
          component: Asesor
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
