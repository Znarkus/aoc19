'use strict'

const assert = require('assert').strict
const { parse } = require('../lib/parse')
const { measurePath, find } = require('../lib/objects')

const objects = parse(
  'COM)B\n' +
  'B)C\n' +
  'C)D\n' +
  'D)E\n' +
  'E)F\n' +
  'B)G\n' +
  'G)H\n' +
  'D)I\n' +
  'E)J\n' +
  'J)K\n' +
  'K)L\n' +
  'K)YOU\n' +
  'I)SAN'
)

assert.equal(measurePath(objects, find(objects, 'YOU'), find(objects, 'SAN')), 4)
