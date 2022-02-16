const robot = require('robotjs')

function logScreenCoord () {
  const mouse = robot.getMousePos()
  console.log(mouse)
}
setInterval(() => { logScreenCoord() }, 200)
