import router from '../router'

export default {
  user: {
    username: '',
    authenticated: false
  },

  login(data, redirect) {
    this.user.username = data.username
    this.user.authenticated = true
    router.push(redirect)
  },

  logout() {
    this.user.authenticated = false
    router.push('/login')
  }
}
