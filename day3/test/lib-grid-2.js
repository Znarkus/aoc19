'use strict'

const assert = require('assert').strict
const Grid = require('../lib/grid')

const grid = new Grid([
  ['R2', 'U2', 'L10', 'U10'],
  ['L2', 'U5', 'L10']
])

grid.draw()

assert.equal(grid.shortestDistance, 4)
assert.equal(grid.shortestLength, 12)
