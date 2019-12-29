'use strict'

const assert = require('assert').strict
const Image = require('../lib/image')

const image = new Image(2, 2)

const layers = image.parse('0222112222120000'.split('').map(p => parseInt(p)))

assert.deepEqual(
  image.merge(layers),
  [
    [0, 1],
    [1, 0],
  ]
)
