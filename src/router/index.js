import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Timers from '@/components/Timers'
import Insights from '@/components/Insights'
import Timeline from '@/components/Timeline'

import auth from '@/auth'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Timers',
      component: Timers
    },
    {
      path: '/insights',
      name: 'Insights',
      component: Insights
    },
    {
      path: '/timeline',
      name: 'Timeline',
      component: Timeline
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') next()
  if (!auth.user.authenticated) next('/login')
  else next()
})

export default router
