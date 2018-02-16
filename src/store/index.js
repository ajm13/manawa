import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.json'
import { timeline } from './timeline.json'

const STORAGE_KEY = 'manawa'
const DAY = 24 * 60 * 60 * 1000

Vue.use(Vuex)

// REMOVE FOR PRODUCTION
localStorage.removeItem(STORAGE_KEY)

// get data from localStorage
let saved = window.localStorage.getItem(STORAGE_KEY)
if (saved !== null) saved = JSON.parse(saved)
else {
  saved = data
  data.timeline = timeline
}

const state = saved

const getters = {
  active: state => state.active,
  categories: state => state.categories,
  colors: state => state.colors,
  timers: state => state.timers,
  getTimes: state => ({ start, days }) => {
    let d = new Date(start)
    let end = new Date(+d + days * DAY)
    let categories = {}
    let total = 0

    while (d < end) {
      let events = state.timeline[d.toDateString()] || []
      for (let event of events) {
        if (!categories[event.category]) categories[event.category] = 0
        let time = event.end - event.start
        categories[event.category] += time
        total += time
      }
      d = new Date(+d + DAY)
    }

    let times = []
    for (let key of Object.keys(categories)) {
      times.push({ category: key, time: categories[key] })
    }

    times.push({ category: 'nothing', time: days * DAY - total })
    total = days * DAY
    return { total, times }
  }
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
