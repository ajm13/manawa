<template>
  <div id="home">
    <div id="date">{{ date }}</div>
    <div id="tracking">
      <div v-for="cat in categories"
        :key="cat.name">
        <div class="circle"
          @click="cat.time++">
          {{ cat.time | time }}
        </div>
        <div class="cat">
          {{ cat.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: this.getDate(),
      categories: [
        { time: 0, name: 'sleep' },
        { time: 0, name: 'eat' },
        { time: 0, name: 'work' },
        { time: 0, name: 'class' },
        { time: 0, name: 'study' },
        { time: 0, name: 'exercise' },
        { time: 0, name: 'travel' },
        { time: 0, name: 'extracurriculars' },
        { time: 0, name: 'fun' }
      ]
    }
  },

  methods: {
    getDate() {
      // returns date formatted like 'Thu, Feb 8'
      return new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    }
  },

  filters: {
    time(v) {
      let h = Math.floor(v / 60)
      let m = ('00' + v % 60).substr(-2)
      return h + ':' + m
    }
  }
}
</script>

<style lang="sass">
#home
  #date
    font-size: 1.5rem

  #tracking
    margin: 1em auto
    max-width: 400px
    display: flex
    flex-flow: row wrap
    justify-content: space-around

    > div
      margin-top: 1em
      flex: 33%
      text-align: center

    .circle
      display: inline-block
      width: 5em
      height: 5em
      line-height: 5em
      border: 2px solid #999
      border-radius: 50%
</style>
