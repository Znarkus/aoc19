'use strict'

class Grid {
  grid = {}
  shortestDistance
  shortestLength

  constructor (wires) {
    this.wires = wires
  }

  getGridKey (x, y, idx) {
    return `${idx}:${x}x${y}`
  }

  drawPoint ({ x, y, idx, wireLength }) {
    const key = this.getGridKey(x, y, idx)
    this.grid[key] = this.grid[key] || wireLength

    for (let otherIdx = 0; otherIdx < this.wires.length; otherIdx++) {
      if (idx === otherIdx) continue

      const otherKey = this.getGridKey(x, y, otherIdx)

      if (this.grid[otherKey] !== undefined) {
        const d = Math.abs(x) + Math.abs(y)
        this.shortestDistance = this.shortestDistance !== undefined
          ? Math.min(this.shortestDistance, d)
          : d

        const l = this.grid[otherKey] + wireLength
        this.shortestLength = this.shortestLength !== undefined
          ? Math.min(this.shortestLength, l)
          : l

        console.debug('collision', { x, y, idx, d, l })
      }
    }
  }

  drawLine ({ from, to, idx, wireLength }) {
    const current = { ...from }
    const dim = from.x !== to.x ? 'x' : 'y'
    const v = from[dim] < to[dim] ? 1 : -1
    let lineLength = 0

    // Start the new line a pixel in
    for (current[dim] += v; current[dim] !== to[dim] + v; current[dim] += v) {
      lineLength++
      this.drawPoint({ ...current, idx, wireLength: wireLength + lineLength })
    }

    return lineLength
  }

  draw () {
    for (const [idx, wire] of this.wires.entries()) {
      let x = 0
      let y = 0
      let wireLength = 0

      for (const line of wire) {
        const from = { x, y }
        const int = parseInt(line.slice(1))

        switch (line[0]) {
          case 'U':
            y -= int
            break
          case 'R':
            x += int
            break
          case 'D':
            y += int
            break
          case 'L':
            x -= int
            break
          default:
            throw new Error('Wat: ' + line)
        }

        const to = { x, y }

        wireLength += this.drawLine({ from, to, idx, wireLength })
      }
    }
  }
}

module.exports = Grid
