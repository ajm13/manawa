<template>
  <div id="login">
    <div id="logo">
      <img src="../assets/manawa-logo2.png">
    </div>
    <div id="welcome">
      welcome to manawa
    </div>
    <div id="about">
      a time-tracking app that will change your life
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
  margin-top: 10em
  display: flex
  align-items: center
  justify-content: center

  #logo
    position: absolute
    top: 10%
    width: 40%
    img
      max-width: 100%
      max-height: 100%

  #welcome
    font-size: 1.5rem
    position: absolute
    top: 40%

  #about
    position: absolute
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
      border: 2px solid hsl(277, 80%, 60%)
    button
      color: white
      background: hsl(277, 80%, 60%)
      border-radius: 1em
      transition: all 300ms ease
</style>
