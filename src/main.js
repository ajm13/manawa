// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Analytics from 'vue-analytics'
import App from './App'
import router from './router'
import filters from './js/filters'
import store from './store'

Vue.use(Analytics, {
  id: 'UA-115307274-1',
  router
})

for (var filter in filters) {
  if (filters.hasOwnProperty(filter)) {
    Vue.filter(filter, filters[filter])
  }
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
