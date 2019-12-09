'use strict'

const fs = require('fs')
const Computer = require('./lib/computer')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .split(',')

const INPUT = 5

const computer = new Computer(INPUT, program)

computer.run()

console.log('program first address =', computer.program[0])
