<template>
  <div id="timeline">
    <div class="loadMore"
      @click="loadMore">load more</div>
    <ul>
      <li v-for="day of days"
        :key="day.date">
        <div class="date">{{ day.date }}</div>
        <ul>
          <li v-if="day.events.length == 0">no activities logged</li>
          <li class="event"
            v-for="event of day.events"
            :key="event.category + event.end">
            <div class="times">
              <div>{{ event.start | clock }}</div>
              <div>{{ event.end | clock }}</div>
            </div>
            <div class="category"
              :style="{
                borderColor: colors[event.category],
                height: Math.max(3, (event.end - event.start) / 3.6e5) + 'px'
              }">{{ event.category }}</div>
            <div class="time">{{ (event.end - event.start) | time }}</div>
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

  computed: mapGetters(['colors', 'getTimelineWeek']),

  methods: {
    loadMore() {
      let h = document.getElementById('timeline').offsetHeight

      this.days.unshift(...this.getTimelineWeek(this.lastDate))
      this.lastDate = this.days[0].date

      this.$nextTick(() => {
        let nh = document.getElementById('timeline').offsetHeight
        document.documentElement.scrollTop += nh - h
      })
    }
  },

  mounted() {
    this.lastDate = new Date(+new Date(new Date().toDateString()) + 8.64e7)
    this.loadMore()
    this.loadMore()
    this.$nextTick(() => (document.documentElement.scrollTop = 1e9))
  }
}
</script>

<style lang="sass">
#timeline
  .loadMore
    display: inline-block
    padding: 0.5em 1em
    margin: 0 auto
    border: 2px solid hsl(220, 80%, 60%)
    // background: hsl(220, 80%, 60%)
    color: hsl(220, 80%, 60%)
    border-radius: 1em
    transition: all 300ms ease

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
    padding: 0.2em 2em

    .times
      display: flex
      flex-flow: column nowrap
      font-size: 0.6em
      text-align: right
      width: 3em

    .category
      display: flex
      align-items: center
      border-left: 3px solid #000
      margin-left: 0.8em
      padding-left: 0.8em
      flex: 1
</style>
