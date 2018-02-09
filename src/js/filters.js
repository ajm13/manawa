export default {
  time(v) {
    let h = Math.floor(v / 60)
    let m = ('00' + v % 60).substr(-2)
    return h + ':' + m
  }
}
