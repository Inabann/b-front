import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import Facturas from '@/components/Factura/Facturas'
import Asesor from '@/components/Asesor/Asesor'
import Plan from '@/components/Plan/Plan'
import Producto from '@/components/Producto/Producto'
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
        },
        {
          path: 'plan',
          component: Plan,
          meta: { forAuth : true}
        },
        {
          path: 'producto',
          component: Producto,
          meta: { forAuth : true}
        },
        {
          path: 'facturas',
          component: Facturas,
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
