'use strict'

const assert = require('assert').strict
const path = require('path')
const lib = require('../lib/simulator')

// Example 1

const positions = lib.parse(lib.load(path.resolve(__dirname, 'example1-1.txt')))

assert.deepEqual(
  positions,
  [
    { x: -1, y: 0, z: 2 },
    { x: 2, y: -10, z: -7 },
    { x: 4, y: -8, z: 8 },
    { x: 3, y: 5, z: -1 }
  ]
)

const steps = lib.runSimulation(positions, 10)

assert.deepEqual(
  steps[0],
  [
    { id: 0, position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
    { id: 1, position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
    { id: 2, position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
    { id: 3, position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
  ]
)

assert.deepEqual(
  steps[1][0],
  { id: 0, position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } },
)

assert.deepEqual(
  steps[2][0],
  { id: 0, position: { x: 5, y: -3, z: -1 }, velocity: { x: 3, y: -2, z: -2 } },
)

assert.deepEqual(
  steps[10][0],
  { id: 0, position: { x: 2, y: 1, z: -3 }, velocity: { x: -3, y: -2, z: 1 } },
)

assert.equal(
  lib.calcTotalEnergy(steps[10]),
  179
)

// Example 2

const steps2 = lib.runSimulation(
  lib.parse(lib.load(path.resolve(__dirname, 'example1-2.txt'))),
  100
)

assert.equal(
  lib.calcTotalEnergy(steps2[100]),
  1940
)
