let fs = require('fs')

let categories = [
  'sleep',
  'work',
  'class',
  'study',
  'eat',
  'exercise',
  'travel',
  'fun',
  'extracurriculars'
]

let d = new Date(2017, 0)
let end = new Date(2020, 0)

let timeline = {}

while (d < end) {
  let events = []
  left = 8.64e7 - 3.6e6
  let i = 0

  while (left > 3.6e6 && i < categories.length) {
    let end = Math.floor(Math.random() * 8 * 3.6e6)
    end = Math.max(3.6e6, end)
    end = Math.min(left, end)
    left -= end
    events.push({ category: categories[i++], start: 0, end })
  }

  timeline[d.toDateString()] = events
  d = new Date(+d + 8.64e7)
}

fs.writeFileSync('timeline.json', JSON.stringify({ timeline }, null, '  '))
