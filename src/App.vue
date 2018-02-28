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

export default {
  components: { Navbar },
  name: 'App',
  data() {
    return {
      auth,
      user: auth.user
    }
  },
  mounted() {
    document.addEventListener('touchmove', e => {
      if (e.scale !== 1) e.preventDefault()
    })

    let last = 0
    document.addEventListener('touchend', e => {
      let now = Date.now()
      if (now - last <= 500) e.preventDefault()
      last = now
    })
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  -webkit-tap-highlight-color: transparent

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
