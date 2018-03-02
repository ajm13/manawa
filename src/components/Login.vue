<template>
  <div id="login">
    <div id="content">
      <img src="../assets/manawa-logo2.png">
      <div id="welcome">
        welcome to manawa
      </div>
      <div id="about">
        a time-tracking app that will change your life
      </div>
    </div>
    <form id="inputs"
      action="javascript:void(0);">
      <input v-model="username"
        type="text"
        placeholder="username"><br>
      <input v-model="password"
        type="password"
        placeholder="password"><br>
      <button :disabled="!username || !password"
        @click="login">login</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      let { username, password } = this
      auth.login({ username, password }, '/')
    }
  }
}
</script>

<style lang="sass">
#login
  margin-top: 20%
  display: flex
  align-items: center
  justify-content: center

  #content
    align-items: center
    justify-content: center

    img
      top: 10%
      width: 40%
      max-width: 100%
      max-height: 100%
      margin-bottom: 3%

    #welcome
      font-size: 1.5rem
      top: 40%

    #about
      color: #888
      top: 45%
      left: 20%
      right: 20%

  #inputs
    position: absolute
    top: 55%
    input, button
      width: 100%
      margin-bottom: 0.5em
      border: 2px solid hsl(277, 100%, 50%)
      border-radius: 1em
    button
      color: white
      background: hsl(277, 100%, 50%)
      transition: all 300ms ease
</style>
