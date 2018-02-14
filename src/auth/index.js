import router from '../router'

export default {
  user: {
    authenticated: false
  },

  login(data, redirect) {
    this.user.authenticated = true
    router.push(redirect)
  }
}
