import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard/Dashboard'
import Facturas from '@/components/Factura/Facturas'
import Stock from '@/components/Factura/Stock'
import Asesor from '@/components/Asesor/Asesor'
import Plan from '@/components/Plan/Plan'
import Producto from '@/components/Producto/Producto'
import Ventas from '@/components/Venta/Ventas'
import Registro from '@/components/Venta/Registro'
import Packs from '@/components/Pack/Packs'
import Locales from '@/components/Local/Locales'
import Pagos from '@/components/Pago/Pagos'

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
          meta: { forAuth : true}
        },
        {
          path: 'dashboard',
          component: Dashboard,
          meta: { forAuth : true, forAdmin : false}
        },
        {
          path: 'plan',
          component: Plan,
          meta: { forAuth : true, forAdmin : false}
        },
        {
          path: 'producto',
          component: Producto,
          meta: { forAuth : true, forAdmin : true}
        },
        {
          path: 'facturas',
          component: Facturas,
          meta: { forAuth : true, forAdmin : false}
        },
        {
          path: 'stock',
          component: Stock,
          meta: { forAuth : true, forAdmin : false}
        },
        {
          path: 'ventas',
          component: Ventas,
          meta: { forAuth : true}
        },
        {
          path: 'registro',
          component: Registro,
          meta: { forAuth : true}
        },
        {
          path: 'packs',
          component: Packs,
          meta: { forAuth : true, forAdmin : true}
        },
        {
          path: 'locales',
          component: Locales,
          meta: { forAdmin : true}
        },
        {
          path: 'pagos',
          component: Pagos,
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
