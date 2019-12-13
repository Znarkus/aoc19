'use strict'

const fs = require('fs')
const { parse } = require('./lib/parse')
const { find } = require('./lib/objects')

const objects = parse(fs.readFileSync('./input.txt', { encoding: 'utf8' }))

const you = find(objects, 'YOU')
const san = find(objects, 'SAN')

console.log(you)
console.log(san)
