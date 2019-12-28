'use strict'

const fs = require('fs')
const { maximizeThrusters } = require('./lib/thrusters')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .split(',')

const max = maximizeThrusters(program)

console.log(max)
