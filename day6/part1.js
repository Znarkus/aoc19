'use strict'

const fs = require('fs')
const { parse } = require('./lib/parse')
const { count } = require('./lib/objects')

const objects = parse(fs.readFileSync('./input.txt', { encoding: 'utf8' }))

console.log(count(objects))
