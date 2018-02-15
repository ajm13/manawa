export default {
  time(v) {
    v = v || 0
    let t = Math.floor(v / 1000)
    let h = Math.floor(t / 60)
    let m = ('00' + t % 60).substr(-2)
    return h + ':' + m
  }
}
