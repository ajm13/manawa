<template>
  <div id="app">
    <div v-if="user.authenticated"
      id="logout"
      @click="auth.logout()">log out</div>
    <router-view/>
    <navbar v-if="user.authenticated" />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import auth from '@/auth'
import { mapActions } from 'vuex'

const DAY = 8.64e7

export default {
  components: { Navbar },
  name: 'App',
  data() {
    return {
      auth,
      user: auth.user
    }
  },

  methods: mapActions(['checkDayReset']),

  mounted() {
    document.addEventListener('touchmove', e => {
      if (e.scale !== 1) e.preventDefault()
    })

    document.addEventListener('visibilitychange', e => {
      if (!document.hidden) this.checkDayReset()
    })

    let tomorrow = new Date(new Date(+new Date() + DAY).toDateString())
    setTimeout(() => this.checkDayReset(), tomorrow - new Date())
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  -webkit-tap-highlight-color: transparent
  touch-action: manipulation

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 2em
  -webkit-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
  padding-bottom: 4em

  #logout
      position: absolute
      top: 0
      left: 0
      padding: 0.5em
      color: #ccc

      &:hover
        color: #888

input, button
  font: inherit
  padding: 0.5em 1em
  outline: none
  background-color: transparent
  border: 1px solid #999
  border-radius: 0

ul, li
  list-style: none
</style>
