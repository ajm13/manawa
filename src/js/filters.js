export default {
  time(v) {
    v = v || 0
    let t = Math.floor(v / 1000)
    let s = ('0' + t % 60).substr(-2)
    t = Math.floor(t / 60)
    let m = ('0' + t % 60).substr(-2)
    let h = Math.floor(t / 60)
    return h + ':' + m + ':' + s
  },
  clock(d) {
    d = new Date(d)
    let h = d.getHours()
    let m = ('0' + d.getMinutes()).substr(-2)
    return h + ':' + m
  }
}
