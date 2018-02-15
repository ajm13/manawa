<template>
  <div id="insights">
    <ul id="timespan">
      <li class="active">day</li>
      <li>week</li>
      <li>month</li>
      <li>year</li>
    </ul>
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
    <div id="recommendation">
      You have 3 hours of unaccounted time.<br>Go outside or something, idk.
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
let { sin, cos, PI } = Math
let tau = 2 * PI

export default {
  data() {
    return {
      circle: PI * 200,
      circleText: '',
      date: new Date().toLocaleDateString('en-US', {
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
    selectCategory(cat) {
      this.circleText = cat
    },
    unsetCategory() {
      this.circleText = this.date
    }
  },
  mounted() {
    this.circleText = this.date
  }
}
</script>

<style lang="sass">
#insights
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
