const robot = require('robotjs')
const fs = require('fs')

const colorsArray = []
function logScreenColor () {
  const img = robot.screen.capture(0, 0, 1440, 900)
  const mouse = robot.getMousePos()
  var pixelColor = img.colorAt(mouse.x, mouse.y)
  console.log(pixelColor)
  colorsArray.push(pixelColor)
  console.log(colorsArray)
  const json = JSON.stringify(colorsArray)
  fs.writeFileSync('./data/chickenColors.json', json)
}
console.log('started!')
setInterval(() => logScreenColor(), 4000)
