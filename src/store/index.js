import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.json'

const STORAGE_KEY = 'manawa'

Vue.use(Vuex)

// REMOVE FOR PRODUCTION
localStorage.removeItem(STORAGE_KEY)

// get data from localStorage
let saved = window.localStorage.getItem(STORAGE_KEY)
if (saved !== null) saved = JSON.parse(saved)
else saved = data

const state = saved

const getters = {
  active: state => state.active,
  categories: state => state.categories,
  colors: state => state.colors,
  timers: state => state.timers
}

const actions = {
  toggleTimer({ state, commit }, category) {
    let newTimer = state.active.category !== category
    if (state.active.category) commit('STOP_ACTIVE')
    if (newTimer) commit('START_ACTIVE', category)
  }
}

const mutations = {
  START_ACTIVE(state, category) {
    state.active.category = category
    state.active.start = Date.now()
    if (!state.timers[category]) state.timers[category] = 0
  },
  STOP_ACTIVE(state) {
    let start = state.active.start
    let end = Date.now()
    let category = state.active.category
    let time = end - state.active.start

    state.timers[category] += time

    let today = new Date().toDateString()

    if (!state.timeline[today]) state.timeline[today] = []

    state.timeline[today].push({
      category,
      start,
      end
    })

    state.active.category = ''
  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  })
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [localStoragePlugin]
})
