import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Timers from '@/components/Timers'
import TimersB from '@/components/TimersB'
import Insights from '@/components/Insights'
import Timeline from '@/components/Timeline'

import auth from '@/auth'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
      path: '/timersB',
      name: 'TimersB',
      component: TimersB
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
ga(router, 'UA-115307274-1')

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') next()
  if (!auth.user.authenticated) next('/login')
  else next()
})

export default router
