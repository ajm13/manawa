import router from '../router'

let STORAGE_KEY = 'manawa-auth'

let user = sessionStorage.getItem(STORAGE_KEY)
if (user !== null) user = JSON.parse(user)
else {
  user = {
    username: '',
    authenticated: false
  }
}

export default {
  user,

  login(data, redirect) {
    this.user.username = data.username
    this.user.authenticated = true
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
    router.push(redirect)
  },

  logout() {
    this.user.authenticated = false
    sessionStorage.removeItem(STORAGE_KEY)
    router.push('/login')
  }
}
