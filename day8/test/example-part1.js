'use strict'

const assert = require('assert').strict
const Image = require('../lib/image')

const image = new Image(3, 2)

const layers = image.parse('123456789012'.split('').map(p => parseInt(p)))

assert.deepEqual(
  layers,
  [
    [
      [1,2,3],
      [4,5,6],
    ],
    [
      [7,8,9],
      [0,1,2],
    ],
  ]
)

assert.deepEqual(
  Image.stats(layers),
  [
    { '1': 1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1 },
    { '0': 1, '1': 1, '2': 1, '7': 1, '8': 1, '9': 1 }
  ]
)
