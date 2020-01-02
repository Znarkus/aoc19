'use strict'

const path = require('path')
const assert = require('assert').strict
const lib = require('../lib/asteroids')

// Example 1

const asteroids = lib.parseMap(lib.load(path.resolve(__dirname, 'example1.txt')))

assert.deepEqual(
  asteroids,
  [
    { x: 1, y: 0, id: 0 },
    { x: 4, y: 0, id: 1 },
    { x: 0, y: 2, id: 2 },
    { x: 1, y: 2, id: 3 },
    { x: 2, y: 2, id: 4 },
    { x: 3, y: 2, id: 5 },
    { x: 4, y: 2, id: 6 },
    { x: 4, y: 3, id: 7 },
    { x: 3, y: 4, id: 8 },
    { x: 4, y: 4, id: 9 }
  ]
)

lib.precalcAsteroids(asteroids)

assert.equal(asteroids[8].angles[4], asteroids[8].angles[0])

const best = lib.findBestPosition(asteroids)

assert.equal(best.count, 8)
assert.equal(best.asteroid.x, 3)
assert.equal(best.asteroid.y, 4)

// Example 2

const ast2 = lib.parseMap(lib.load(path.resolve(__dirname, 'example2.txt')))

lib.precalcAsteroids(ast2)
const best2 = lib.findBestPosition(ast2)
assert.equal(best2.count, 33)
assert.equal(best2.asteroid.x, 5)
assert.equal(best2.asteroid.y, 8)

// Example 3

const ast3 = lib.parseMap(lib.load(path.resolve(__dirname, 'example3.txt')))

lib.precalcAsteroids(ast3)
const best3 = lib.findBestPosition(ast3)
assert.equal(best3.count, 35)
assert.equal(best3.asteroid.x, 1)
assert.equal(best3.asteroid.y, 2)

// Example 4

const ast4 = lib.parseMap(lib.load(path.resolve(__dirname, 'example4.txt')))

lib.precalcAsteroids(ast4)
const best4 = lib.findBestPosition(ast4)
assert.equal(best4.count, 41)
assert.equal(best4.asteroid.x, 6)
assert.equal(best4.asteroid.y, 3)

// Example 5

const ast5 = lib.parseMap(lib.load(path.resolve(__dirname, 'example5.txt')))

lib.precalcAsteroids(ast5)
const best5 = lib.findBestPosition(ast5)
assert.equal(best5.count, 210)
assert.equal(best5.asteroid.x, 11)
assert.equal(best5.asteroid.y, 13)

