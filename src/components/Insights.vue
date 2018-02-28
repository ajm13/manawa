<template>
  <div id="insights">
    <ul id="timespan">
      <li v-for="range of ranges"
        :key="range"
        :class="{ active: currentRange === range }"
        @click="selectRange(range)">{{ range }}</li>
    </ul>
    <div class="donutBox">
      <div id="prev"
        class="chevron"
        @click="moveStartDate(-1)">
        <div>&lt;</div>
      </div>
      <svg class='donut'
        @click="deselectCategory">
        <path v-for="time in times"
          :key="time.color"
          @click.stop="selectCategory(time)"
          :d="arc(150, 150, 100, time.o, time.a)"
          :stroke="time.color"></path>
      </svg>
      <div id="centerText"
        v-html="circleText"></div>
      <div id="next"
        class="chevron"
        @click="moveStartDate(1)">
        <div>&gt;</div>
      </div>
    </div>
    <div id="recommendation">
      Hi {{ username }}, you have {{ nothing }} hours of unaccounted time.<br>You could've used that time to get your students' grades out faster!
    </div>
    <div id="legend">
      <div v-for="d in times"
        :key="d.category"
        @click="selectCategory(d)">
        <div class="blip"
          :style="{ backgroundColor: d.color }"></div>
        {{ d.category }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import auth from '@/auth'

const { sin, cos, PI } = Math
const tau = 2 * PI
const DAY = 8.64e7

export default {
  data() {
    return {
      username: auth.user.username,
      currentRange: 'day',
      startDate: new Date(new Date().toDateString()),
      numDays: 1,
      ranges: ['day', 'week', 'month', 'year'],
      circleText: '',
      rangeText: ''
    }
  },
  computed: {
    ...mapGetters(['colors', 'getTimes']),
    nothing() {
      let nothing = this.times[this.times.length - 1]
      if (nothing.category !== 'nothing') return 0
      else return (nothing.time / 3.6e6).toFixed(1)
    },
    times() {
      let data = this.getTimes({
        start: this.startDate,
        days: this.numDays
      })

      let offset = -PI / 2
      let total = data.total

      return data.times.map(t => {
        let { category, time } = t

        let color = this.colors[category]
        let a = time / total * tau
        let o = offset
        offset += a

        // adds spacing
        a -= 0.025
        o += 0.0125
        return { category, color, time, a, o }
      })
    }
  },
  methods: {
    arc(x, y, r, sa, a) {
      let sx = x + r * cos(sa)
      let sy = y + r * sin(sa)
      let ex = x + r * cos(sa + a)
      let ey = y + r * sin(sa + a)
      let la = a < PI ? 0 : 1
      return `M ${sx} ${sy} A ${r} ${r} 0 ${la} 1 ${ex} ${ey}`
    },
    log(a) {
      console.log(a)
    },
    moveStartDate(dir) {
      this.startDate = new Date(+this.startDate + dir * this.numDays * DAY)
      this.selectRange(this.currentRange)
    },
    selectRange(range) {
      let date = this.startDate
      let y = date.getFullYear()
      let m = date.getMonth()
      let d = date.getDate()
      let day = date.getDay()
      let start, end

      this.currentRange = range

      switch (range) {
        case 'day':
          this.numDays = 1
          break
        case 'week':
          this.startDate = new Date(y, m, d - day)
          this.numDays = 7
          break
        case 'month':
          start = new Date(y, m)
          end = new Date(y, m + 1)
          this.startDate = new Date(y, m)
          this.numDays = (end - start) / DAY
          break
        case 'year':
          start = new Date(y, 0)
          end = new Date(y + 1, 0)
          this.startDate = new Date(y, 0)
          this.numDays = (end - start) / DAY
          break
      }

      this.setRangeText()
      this.circleText = this.rangeText
    },
    setRangeText() {
      let [day, month, date, year] = this.startDate.toDateString().split(' ')

      switch (this.currentRange) {
        case 'day':
          this.rangeText = `${day}<br>${month} ${date}`
          break
        case 'week':
          this.rangeText = `week of<br>${month} ${date}`
          break
        case 'month':
          this.rangeText = month
          break
        case 'year':
          this.rangeText = year
          break
      }
    },
    selectCategory(time) {
      let t = this.$options.filters.time(time.time / 60)
      this.circleText = `${time.category}<br>${t}`
    },
    deselectCategory() {
      this.circleText = this.rangeText
    }
  },
  mounted() {
    this.setRangeText()
    this.circleText = this.rangeText
  }
}
</script>

<style lang="sass">
#insights
  position: relative

  #timespan
    list-style: none
    margin: 0
    padding: 0
    display: flex
    border-top: 1px solid #999
    border-bottom: 1px solid #999

    li
      flex: 1
      padding: 0.5em

      &.active
        background-color: #ddd

  .donutBox
    position: relative

  #centerText
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 1.3em

  .chevron
    top: 0
    height: 300px
    width: 50px
    position: absolute

    > div
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%) scaleY(3)

    &#prev
      left: 0

    &#next
      right: 0

  .donut
    width: 300px
    height: 300px

    #date
      font-size: 1.2em

    path
      fill: none
      stroke-width: 50px

    &:hover path
      opacity: 0.5

    path:hover
      opacity: 1

  #recommendation
    border-top: 1px solid #999
    border-bottom: 1px solid #999
    padding: 1em

  #legend
    text-align: left
    padding: 1em 0
    column-count: 2

    > div
      margin-left: 2em

    .blip
      display: inline-block
      width: 0.7em
      height: 0.7em
      border-radius: 50%
</style>
