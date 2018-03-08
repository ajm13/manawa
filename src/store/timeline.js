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

let d = new Date(new Date(2014, 0).toDateString())
let end = new Date(new Date().toDateString())

let timeline = {}

while (d < end) {
  let events = []
  left = 8.64e7

  let start = +d
  while (left > 0) {
    let i = Math.floor(Math.random() * categories.length)
    if (start === +d) i = 0
    let len = Math.min(Math.floor(Math.random() * 6 * 3.6e6), left)
    let end = start + len

    events.push({ category: categories[i], start, end })

    let nothing = Math.min(left, Math.floor(Math.random() * 3.6e6 * 0.25))
    start = end + nothing
    left -= len + nothing
  }

  timeline[d.toDateString()] = events
  d = new Date(+d + 8.64e7)
}

fs.writeFileSync('timeline.json', JSON.stringify({ timeline }, null, '  '))
