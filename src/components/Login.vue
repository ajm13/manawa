<template>
  <div id="login">
    <input v-model="user"
      type="text">
    <input v-model="pass"
      type="password">
    <button @click="login">login</button>
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
      alert('Welcome ' + this.user)
      auth.login({}, '/')
    }
  }
}
</script>

<style>

</style>
