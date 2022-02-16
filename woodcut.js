const { time } = require('console')
const { openInventory, sleep, dropFirstItem, randomNumberBetween } = require('./support/supportFunctions.js')
const screenSize = require('./data/screenSize')
const robot = require('robotjs')

function testScreenCapture () {
  const img = robot.screen.capture(0, 0, 1440, 900)
  const mouse = robot.getMousePos()
  var pixelColor = img.colorAt(mouse.x, mouse.y)
  console.log(pixelColor)
}

function findTree () {
  const width = screenSize.width
  const height = screenSize.height
  const img = robot.screen.capture(0, 0, width, height)
  const colorsArray = ['815e33', '72522c', '121203', '3f4812', '654928', '72522c', '1d2000', '4b5415', '566524', '080802', '080802', '121508', '191c09', '46331b', '100c04', '372814', '291f10', '46331b', '0f1207', '0f1209', '0b0e05']
  let timesToFindTree = 0
  for (let i = 0; i < 10000; i++) {
    const randomX = randomNumberBetween(0, width - 1)
    const randomY = randomNumberBetween(0, height - 1)
    const color = img.colorAt(randomX, randomY)
    if (colorsArray.includes(color)) {
      console.log(`found a tree after ${timesToFindTree} searches`)
      return { x: randomX, y: randomY }
    } else {
      timesToFindTree++
    }
  }
  console.log(`${timesToFindTree}`)
  console.log('I was not able to find a tree :(')
  return 0
}

async function clickTree () {
  const treeCoordinates = findTree()
  if (treeCoordinates) {
    console.log(treeCoordinates)
    robot.moveMouseSmooth(treeCoordinates.x, treeCoordinates.y, 0.99)
    robot.mouseClick()
  } else {
    console.log('no tree found')
  }
}

const main = async () => {
  console.log('starting')
  await sleep(2000)
  await clickTree()
  await sleep(12000)
  await openInventory(1126, 840)
  await dropFirstItem()
  console.log('finished')
}

async function cutTree () {
  for (let i = 0; i < 1000; i++) {
    await main()
    await console.log(i)
  }
}
cutTree()
