'use strict'

const path = require('path')
const assert = require('assert').strict
const lib = require('../lib/asteroids')

// Example 1

const asteroids = lib.parseMap(lib.load(path.resolve(__dirname, 'example2-1.txt')))

lib.precalcAsteroids(asteroids)

const vaporized = lib.vaporize(
  asteroids,
  asteroids.find(a => a.x === 8 && a.y === 3)
)

assert.equal(vaporized[vaporized.length - 1].asteroid.x, 14)
assert.equal(vaporized[vaporized.length - 1].asteroid.y, 3)

// Example 2

const testAsteroids = [
  { x: 11, y: 13, id: 1},
  { x: 10, y: 13, id: 2},
  { x: 11, y: 12, id: 3},
]

lib.precalcAsteroids(testAsteroids)

assert.deepEqual(
  testAsteroids[0].angles,
  {
    2: Math.PI,
    3: -Math.PI / 2,
  }
)

const asteroids2 = lib.parseMap(lib.load(path.resolve(__dirname, 'example5.txt')))

lib.precalcAsteroids(asteroids2)

const vaporized2 = lib.vaporize(
  asteroids2,
  asteroids2.find(a => a.x === 11 && a.y === 13)
)

assert.equal(vaporized2[0].asteroid.x, 11)
assert.equal(vaporized2[0].asteroid.y, 12)

assert.equal(vaporized2[199].asteroid.x, 8)
assert.equal(vaporized2[199].asteroid.y, 2)

assert.equal(vaporized2[298].asteroid.x, 11)
assert.equal(vaporized2[298].asteroid.y, 1)
