'use strict'

const fs = require('fs')

exports.load = (filename) => {
  return fs.readFileSync(filename, { encoding: 'utf8' })
    .trim()
}

exports.parseMap = (string) => {
  const asteroids = []

  for (const [y, row] of string.split('\n').entries()) {
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== '#') {
        continue
      }

      asteroids.push({ x, y, id: asteroids.length })
    }
  }

  return asteroids
}

/**
 * Calculate angle and distance to other asteroids
 */
exports.precalcAsteroids = (asteroids) => {
  for (const asteroid of asteroids) {
    asteroid.angles = {}
    asteroid.distances = {}

    for (const as2 of asteroids) {
      if (asteroid.id === as2.id) {
        continue
      }

      const vecx = as2.x - asteroid.x
      const vecy = as2.y - asteroid.y
      asteroid.angles[as2.id] = Math.atan2(vecy, vecx)
      asteroid.distances[as2.id] = Math.sqrt(vecx * vecx + vecy * vecy)
    }
  }
}

exports.findBestPosition = (asteroids) => {
  const best = {}

  for (const asteroid of asteroids) {
    const unique = Object.values(asteroid.angles).reduce((ack, cur) => {
      ack[cur] = true
      return ack
    }, {})

    const count = Object.keys(unique).length

    if (best.count === undefined || best.count < count) {
      best.count = count
      best.asteroid = asteroid
    }
  }

  return best
}

exports.vaporize = (asteroids, laserAsteroid) => {
  // Sort by relative angle to "up" (-PI / 2 rad)
  const sorted = Object.keys(laserAsteroid.angles).reduce((ack, cur) => {
    const angle = laserAsteroid.angles[cur]

    // relAngle -> angle relative to "up" (-PI / 2 rad)
    let relAngle = angle + Math.PI / 2

    if (relAngle < 0) {
      // Make sure 0 is the lowest value
      // Values will be in the range -PI .. +PI before this
      relAngle += Math.PI * 2
    }

    ack.push({
      angle,
      relAngle,
      asteroid: asteroids[cur],
      distance: laserAsteroid.distances[cur],
    })

    return ack
  }, []).sort((a, b) => {
    if (a.relAngle === b.relAngle) {
      return a.distance - b.distance
    }

    return a.relAngle - b.relAngle
  })

  let currentTurn = sorted
  let nextTurn
  let lastRelAngle

  const vaporized = []

  do {
    lastRelAngle = null
    nextTurn = []

    for (const asteroid of currentTurn) {
      if (lastRelAngle === asteroid.relAngle) {
        nextTurn.push(asteroid)
        continue
      }

      vaporized.push(asteroid)

      lastRelAngle = asteroid.relAngle
    }

    if (currentTurn.length === nextTurn.length) {
      console.log(nextTurn)
      throw new Error('Same asteroids in this turn and next turn')
    }

    currentTurn = nextTurn
  } while (nextTurn.length)

  return vaporized
}
