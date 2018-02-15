<template>
  <div id="login">
    <form id="inputs"
      action="javascript:void(0);">
      <input v-model="user"
        type="text"
        placeholder="username"><br>
      <input v-model="pass"
        type="password"
        placeholder="password"><br>
      <button @click="login">login</button>
    </form>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login() {
      // alert('Welcome ' + this.user)
      auth.login({}, '/')
    }
  }
}
</script>

<style lang="sass">
#login
  display: flex
  align-items: center
  justify-content: center

  #inputs
    input, button
      width: 100%
      margin-bottom: 0.5em
</style>
