import router from '../router'

export default {
  user: {
    username: '',
    authenticated: true
  },

  login(data, redirect) {
    this.user.username = data.username
    this.user.authenticated = true
    router.push(redirect)
  }
}
