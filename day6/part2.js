'use strict'

const fs = require('fs')
const { parse } = require('./lib/parse')
const { find, measurePath } = require('./lib/objects')

const objects = parse(fs.readFileSync('./input.txt', { encoding: 'utf8' }))

const you = find(objects, 'YOU')
const san = find(objects, 'SAN')

const length = measurePath(objects, you, san)

console.log('length =', length)
