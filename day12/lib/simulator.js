'use strict'

const fs = require('fs')

exports.load = (path) => {
  return fs.readFileSync(path, { encoding: 'utf8' })
    .trim()
}

exports.parse = (string) => {
  return string.match(/<([^>]+)>/gm)
    .map(pos => {
      return pos.slice(1, -1).split(',').reduce((ack, cur) => {
        const [k, v] = cur.trim().split('=')
        ack[k] = parseInt(v)
        return ack
      }, {})
    })
}

/**
 * @param positions
 * @param numSteps
 * @param opts
 * @param {Function} opts.debuglog
 * @returns {[]}
 */
exports.runSimulation = (positions, numSteps, opts = {}) => {
  const moons = []
  const debuglog = opts.debuglog || (() => {})

  for (const [i, position] of positions.entries()) {
    moons.push({
      id: i,
      position: { ...position },
      velocity: { x: 0, y: 0, z: 0 },
    })
  }

  const eachAxis = (cb) => {
    for (const axis of ['x', 'y', 'z']) {
      cb(axis)
    }
  }

  debuglog('INITIAL', moons)

  for (let step = 0; step < numSteps; step++) {
    debuglog('STEP', step)
    for (let idx1 = 0; idx1 < moons.length; idx1++) {
      const moon = moons[idx1]
      debuglog('ID =', moon.id)
      for (let idx2 = idx1 + 1; idx2 < moons.length; idx2++) {
        const otherMoon = moons[idx2]
        if (moon.id === otherMoon.id) {
          continue
        }

        eachAxis(axis => {
          if (moon.position[axis] < otherMoon.position[axis]) {
            moon.velocity[axis]++
            otherMoon.velocity[axis]--
          } else if (moon.position[axis] > otherMoon.position[axis]) {
            moon.velocity[axis]--
            otherMoon.velocity[axis]++
          }
        })
      }

      debuglog('vel =', moon.velocity)
      eachAxis(axis => {
        moon.position[axis] += moon.velocity[axis]
      })
      debuglog('pos =', moon.position)
    }

    if (opts.stepCb) {
      if (opts.stepCb(moons)) {
        break
      }
    }
  }

  return moons
}

exports.calcTotalEnergy = (moons) => {
  const energy = moons.map(moon => {
    const pot = Math.abs(moon.position.x)
      + Math.abs(moon.position.y)
      + Math.abs(moon.position.z)

    const kin = Math.abs(moon.velocity.x)
      + Math.abs(moon.velocity.y)
      + Math.abs(moon.velocity.z)

    return pot * kin
  })

  return energy.reduce((ack, cur) => ack + cur, 0)
}
