'use strict'

const fs = require('fs')
const { feedbackLoop } = require('./lib/thrusters')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .split(',')
  .map(c => c.trim())

const max = feedbackLoop(program)

console.log(max)
