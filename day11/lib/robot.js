'use strict'

const fs = require('fs')
const Computer = require('./computer')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .trim()
  .split(',')
  .map(o => parseInt(o))

exports.robot = (firstPanelColor) => {
  const computer = new Computer(program)
  const panels = {}
  const lowest = {}
  const highest = {}
  const robotPos = { x: 0, y: 0 }

  let paintedPanels = 0
  let dir = 0
  let outputStateDir = false

  const paintPanel = (pos, color) => {
    panels[pos.y] = panels[pos.y] || {}

    if (panels[pos.y][pos.x] === undefined) {
      paintedPanels++
    }

    panels[pos.y][pos.x] = color

    lowest.x = lowest.x === undefined ? pos.x : Math.min(lowest.x, pos.x)
    lowest.y = lowest.y === undefined ? pos.y : Math.min(lowest.y, pos.y)
    highest.x = highest.x === undefined ? pos.x : Math.max(highest.x, pos.x)
    highest.y = highest.y === undefined ? pos.y : Math.max(highest.y, pos.y)
  }

  const getPanelColor = (pos) => {
    return panels[pos.y] && panels[pos.y][pos.x]
      ? panels[pos.y][pos.x]
      : 0
  }

  computer.input.push(firstPanelColor)

  computer.on('output', output => {
    if (!outputStateDir) {
      paintPanel(robotPos, output)
    } else {
      if (output === 0) {
        dir -= 90
      } else {
        dir += 90
      }

      if (dir < 0) {
        dir += 360
      } else if (dir >= 360) {
        dir -= 360
      }

      switch (dir) {
        case 0:
          // up
          robotPos.y--
          break

        case 90:
          // right
          robotPos.x++
          break

        case 180:
          // down
          robotPos.y++
          break

        case 270:
          // left
          robotPos.x--
          break

        default:
          throw new Error(`Invalid dir ${dir}`)
      }

      computer.input.push(getPanelColor(robotPos))
    }

    outputStateDir = !outputStateDir
  })

  computer.run()

  console.log({ paintedPanels })

  for (let y = lowest.y; y <= highest.y; y++) {
    const row = []

    for (let x = lowest.x; x <= highest.x; x++) {
      row.push(panels[y][x] === 1 ? ' x ' : '   ')
    }

    console.log(row.join(''))
  }
}
