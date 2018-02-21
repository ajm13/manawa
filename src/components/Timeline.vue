<template>
  <div id="timeline">
    <ul>
      <li v-for="day of days"
        :key="day.date">
        <div class="date">{{ day.date }}</div>
        <ul>
          <li v-if="day.events.length == 0">no activities logged</li>
          <li class="event"
            v-for="event of day.events"
            :key="event.category">
            <div class="times">
              <div>{{ event.start | clock }}</div>
              <div>{{ event.end | clock }}</div>
            </div>
            <div class="category"
              :style="{
                borderColor: colors[event.category]
              }">{{ event.category }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      days: [],
      lastDate: ''
    }
  },

  computed: {
    ...mapGetters(['colors', 'getTimelineWeek'])
  },

  methods: {
    handleScroll(e) {
      let s = window.scrollY
      if (s < 100) this.addMore()
    },
    addMore() {
      this.days.unshift(...this.getTimelineWeek(this.lastDate))
      this.lastDate = this.days[0].date
    }
  },

  mounted() {
    this.lastDate = new Date(+new Date(new Date().toDateString()) + 8.64e7)
    this.addMore()
    this.addMore()
    this.$nextTick(() => (document.documentElement.scrollTop = 1e9))
    // while (document.body.offsetHeight < window.innerHeight) this.addMore()
    document.addEventListener('scroll', this.handleScroll.bind(this))
  },

  destroyed() {
    document.removeEventListener('scroll', this.handleScroll.bind(this))
  }
}
</script>

<style lang="sass">
#timeline
  .date
    text-align: left
    background-color: #eee
    padding: 0.1em 1em
    margin: 0.5em 0
    // color: #fff

  .event
    display: flex
    flex-flow: row nowrap
    align-items: center
    padding: 0.1em 2em

    .times
      display: flex
      flex-flow: column nowrap
      font-size: 0.6em

    .category
      border-left: 2px solid #000
      margin-left: 0.8em
      padding-left: 0.8em
</style>
