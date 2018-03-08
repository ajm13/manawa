<template>
  <div id="login">
    <div id="logo">
      <img src="../assets/manawa-logo4.png">
    </div>
    <div id="welcome">
      welcome to manawa
    </div>
    <div id="about">
      a time-tracking app<br>that will change your life
    </div>
    <br>
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
  padding: 15% 15% 15% 15%
  display: block

  #logo
    img
      max-width: 50%
      max-height: 50%
      margin-bottom: 3%

  #welcome
    font-size: 1.5em

  #about
    color: #888

  #inputs
    input, button
      width: 100%
      margin-bottom: 0.5em
      border: 2px solid hsl(36, 100%, 50%)

    button
      color: white
      background: hsl(36, 100%, 50%)
      transition: all 300ms ease

      &:disabled
        opacity: 0.5
</style>
