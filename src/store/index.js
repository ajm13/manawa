import Vue from 'vue'
import Vuex from 'vuex'
import data from './data.json'
import { timeline } from './timeline.json'
import { analyticsMiddleware } from 'vue-analytics'

const VERSION = '0.0.2'
const STORAGE_KEY = 'manawa'
const VERSION_KEY = 'manawa-v'

Vue.use(Vuex)

// REMOVE FOR PRODUCTION
// localStorage.removeItem(STORAGE_KEY)

// get data from localStorage
let version = localStorage.getItem(VERSION_KEY)
let saved = localStorage.getItem(STORAGE_KEY)

if (version === VERSION && saved !== null) {
  saved = JSON.parse(saved)
} else {
  data.timeline = timeline
  saved = data
  localStorage.setItem(VERSION_KEY, VERSION)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
}

const state = saved

const getters = {
  active: state => state.active,
  categories: state => state.categories,
  colors: state => state.colors,
  timers: state => state.timers,
  getTimelineWeek: state => end => {
    end = new Date(end)
    let d = new Date(end)
    d.setDate(d.getDate() - 6)
    let chunk = []

    // eslint-disable-next-line
    while (d < end) {
      let date = d.toDateString()
      chunk.push({
        date,
        events: state.timeline[date] || []
      })

      d.setDate(d.getDate() + 1)
    }

    return chunk
  },
  getTimes: state => ({ start, days }) => {
    let now = new Date()
    let d = new Date(start)
    let end = new Date(d)
    end.setDate(d.getDate() + days)
    let rangeTime = end - d
    let categories = {}
    let total = 0

    // eslint-disable-next-line
    while (d < end) {
      let events = state.timeline[d.toDateString()] || []
      for (let event of events) {
        if (!categories[event.category]) categories[event.category] = 0
        let time = event.end - event.start
        categories[event.category] += time
        total += time
      }
      d.setDate(d.getDate() + 1)
    }

    let times = []
    for (let key of Object.keys(categories)) {
      times.push({ category: key, time: categories[key] })
    }

    if (start.toDateString() === now.toDateString() && days === 1) {
      let todaytime = now - new Date(now.toDateString())
      times.push({ category: 'nothing', time: todaytime - total })
      total = todaytime
    } else {
      let left = total
      total = rangeTime - Math.max(0, end - new Date())
      times.push({ category: 'nothing', time: total - left })
    }

    return { total, times }
  }
}

const actions = {
  checkDayReset({ state, commit }) {
    let last = new Date(state.lastModified)
    let now = new Date()
    if (last.toDateString() !== now.toDateString()) {
      commit('RESET_TIMERS')
    }
  },
  toggleTimer({ state, commit }, category) {
    let active = state.active.category
    let newTimer = active !== category
    if (active) {
      commit('STOP_ACTIVE', {
        meta: {
          analytics: [
            ['event', 'timer', 'stop ' + active, 'timer experiment', 1]
          ]
        }
      })
    }
    if (newTimer) {
      commit('START_ACTIVE', {
        category,
        meta: {
          analytics: [
            ['event', 'timer', 'start ' + category, 'timer experiment', 1]
          ]
        }
      })
    }
  },
  cancelActive({ state, commit }) {
    let active = state.active.category
    commit('CANCEL_ACTIVE', {
      meta: {
        analytics: [
          ['event', 'timer', 'cancel ' + active, 'timer experiment', 1]
        ]
      }
    })
  }
}

const mutations = {
  START_ACTIVE(state, { category }) {
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
  },
  CANCEL_ACTIVE(state) {
    state.active.category = ''
  },
  RESET_TIMERS(state) {
    if (state.active.category) {
      let aday = new Date(state.active.start).toDateString()
      let today = new Date().toDateString()
      let EOD = new Date(state.active.start.toDateString())
      EOD.setDate(EOD.getDate() + 1)

      if (!state.timeline[aday]) state.timeline[aday] = []

      state.timeline[aday].push({
        category: state.active.category,
        start: state.active.start,
        end: EOD - 1
      })

      state.active.start = EOD

      if (EOD.toDateString() !== today) {
        state.active.category = ''
      }
    }

    state.timers = {}

    if (state.active.category) {
      state.timers[state.active.category] = 0
    }
  },
  UPDATE_LAST_MODIFIED(state) {
    state.lastModified = Date.now()
  }
}

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  })
}

const lastModifiedPlugin = store => {
  store.subscribe(({ type }) => {
    if (type !== 'UPDATE_LAST_MODIFIED') {
      store.commit('UPDATE_LAST_MODIFIED')
    }
  })
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [localStoragePlugin, lastModifiedPlugin, analyticsMiddleware]
})
