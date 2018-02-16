<template>
  <div id="login">
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

  #inputs
    input, button
      width: 100%
      margin-bottom: 0.5em
</style>
