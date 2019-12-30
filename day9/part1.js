'use strict'

const fs = require('fs')
const Computer = require('./lib/computer')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .trim()
  .split(',')
  .map(o => parseInt(o))

const computer = new Computer(program)

computer.input.push(1)
computer.run()

console.log(computer.output)
