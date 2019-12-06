'use strict'

const assert = require('assert').strict
const Grid = require('../lib/grid')

const grid = new Grid([
  ['R2', 'U2', 'L2',],
  ['L2', 'U2', 'R2']
])

grid.draw()

assert.deepEqual(grid.grid, {
  '0:1x0': 1,
  '0:2x0': 2,
  '0:2x-1': 3,
  '0:2x-2': 4,
  '0:1x-2': 5,
  '0:0x-2': 6,
  '1:-1x0': 1,
  '1:-2x0': 2,
  '1:-2x-1': 3,
  '1:-2x-2': 4,
  '1:-1x-2': 5,
  '1:0x-2': 6
})

assert.equal(grid.shortestDistance, 2)
assert.equal(grid.shortestLength, 12)
