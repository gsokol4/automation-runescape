const robot = require('robotjs')
const screenSize = require('./data/screenSize')
const { randomNumberBetween, sleep } = require('./support/supportFunctions')

let failedToFindChicken = 0

function findChicken () {
  const width = screenSize.width
  const height = screenSize.height
  const colorsArray = ['731007', '731007', '5b0c07', '5b0c07', '620e07', '6b1007', '771007', '771007', '771007', '570c04', '570c04', '620e07', '5e0e07', '670e07', '8c140a', '9a160c', '9a160c', '8c140a', 'bca537', 'bca537', 'b49e34', 'baa336', 'a38f2f', 'a38f2f', 'c2aa38', 'bfa737', '8b7928', 'ae9933', 'a38f2f', '6f6020', 'bca537', 'bca176', 'c3ab84', 'c1aa82', 'bea57a', 'bda377', 'b69c71', 'bea57a', 'c0a87f', 'c0a87f', 'c1aa82', 'c3ab84', 'c3ac87', 'baa074', 'bda377', 'bca176', 'bca176']
  let timesToFindChicken = 0
  for (let i = 0; i < 1000; i++) {
    const randomX = randomNumberBetween(30, width - 1)
    const randomY = randomNumberBetween(30, height - 1)
    const color = robot.getPixelColor(randomX, randomY)
    if (colorsArray.includes(color)) {
      console.log(`found a chicken after ${timesToFindChicken} searches`)
      return { x: randomX, y: randomY }
    } else {
      timesToFindChicken++
    }
  }
  console.log(`${timesToFindChicken}`)
  console.log('I was not able to find a chicken :(')
  return false
}

async function killChicken () {
  console.log('kill chicken is running---')
  const chickenLocation = await findChicken()
  console.log(chickenLocation)
  if (!chickenLocation) {
    console.log('we need to trouble shoot here')
    failedToFindChicken += 1
  } else {
    console.log('your else statement is running')
    await robot.moveMouseSmooth(chickenLocation.x, chickenLocation.y, 0.9)
    await robot.mouseClick()
  }
}

async function main () {
  await sleep(2000)
  console.log('main started')
  let count = 0
  while (count < 10000) {
    console.log()
    await killChicken()
    await sleep(randomNumberBetween(1000, 4000))
    count++
  }
}

async function callMain () {
  await main()
  console.log(failedToFindChicken)
}
callMain()
