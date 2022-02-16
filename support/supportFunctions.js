const robot = require('robotjs')

function randomNumberBetween (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function checkIfInventoryIsOpen (x, y, colorToVerify) {
  const inventoryBackground = robot.getPixelColor(x, y)
  console.log(inventoryBackground)
  if (inventoryBackground === colorToVerify) {
    return true
  } else {
    return false
  }
}

async function openInventory (x, y) {
  if (checkIfInventoryIsOpen(1116, 830, '75281e')) {
    return
  }
  robot.moveMouseSmooth(x, y, 0.99)
  sleep(300)
  robot.mouseClick()
}

async function dropFirstItem () {
  openInventory(1126, 840)
  robot.moveMouseSmooth(1273, 580, 0.99)
  robot.mouseClick('right', false)
  await sleep(randomNumberBetween(500, 1000))
  robot.moveMouseSmooth(1273, 580 + 40, 0.99)
  await sleep(randomNumberBetween(100, 300))
  robot.mouseClick()
  await sleep(randomNumberBetween(1000, 1500))
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function findInventoryItem () {
  openInventory(1126, 840)
  const inventory = { x: 1240, y: 552 }
  const img = robot.screen.capture(inventory.x, inventory.y, 200, (900 - 552))
  const firstItem = robot.screen.capture(inventory.x, inventory.y, (200 / 4), ((900 - 552) / 7))
}

module.exports = { openInventory, dropFirstItem, sleep, randomNumberBetween }
