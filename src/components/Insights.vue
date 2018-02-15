<template>
  <div id="insights">
    <ul id="timespan">
      <li v-for="range of ranges"
        :key="range"
        :class="{ active: currentRange === range }"
        @click="selectRange(range)">{{ range }}</li>
      <!-- <li>day</li>
      <li>week</li>
      <li>month</li>
      <li>year</li> -->
    </ul>
    <div class="donutBox">
      <div id="prev"
        class="chevron"
        @click="moveRange(-1)">
        <div>&lt;</div>
      </div>
      <svg class='donut'
        @click="unsetCategory">
        <text id="date"
          x="50%"
          y="50%"
          text-anchor="middle"
          alignment-baseline="central">{{ circleText }}</text>
        <path v-for="time in times"
          :key="time.color"
          @click.stop="selectCategory(time.category)"
          :d="arc(150, 150, 100, time.o, time.a)"
          :stroke="time.color"></path>
      </svg>
      <div id="next"
        class="chevron"
        @click="moveRange(1)">
        <div>&gt;</div>
      </div>
    </div>
    <div id="recommendation">
      Hi User, you have 3 hours of unaccounted time.<br>You could've used that time to study for your midterm next week!
    </div>
    <div id="legend">
      <div v-for="d in data"
        :key="d.name">
        <div class="blip"
          :style="{backgroundColor: d.color}"></div>
        {{d.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

const { sin, cos, PI } = Math
const tau = 2 * PI
const DAY = 8.64e7

export default {
  data() {
    return {
      currentRange: 'day',
      startDate: new Date(new Date().toDateString()),
      numDays: 1,
      ranges: ['day', 'week', 'month', 'year'],
      circleText: '',
      rangeText: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      data: [
        { name: 'sleep', color: 'hsl(220, 80%, 60%)', t: 7 },
        { name: 'eat', color: 'hsl(60, 80%, 60%)', t: 0.5 },
        { name: 'travel', color: 'hsl(90, 80%, 60%)', t: 0.5 },
        { name: 'work', color: 'hsl(30, 80%, 60%)', t: 8 },
        { name: 'fun', color: 'hsl(270, 80%, 60%)', t: 6 },
        { name: 'nothing', color: 'hsl(0, 80%, 60%)', t: 2 }
      ]
    }
  },
  computed: {
    total() {
      return this.data.reduce((acc, x) => acc + x.t, 0)
    },
    times() {
      let offset = -PI / 2
      let total = this.total

      return this.data.map(t => {
        let a = t.t / total * tau
        let o = offset
        offset += a

        // adds spacing
        a -= 0.025
        o += 0.0125
        return { category: t.name, color: t.color, a, o }
      })
    }
  },
  methods: {
    ...mapActions(['getTimes']),
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
    moveRange(dir) {
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

      this.rangeText = this.startDate.toDateString()
      this.circleText = this.rangeText
    },
    selectCategory(cat) {
      this.circleText = cat
    },
    unsetCategory() {
      this.circleText = this.rangeText
    }
  },
  mounted() {
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
