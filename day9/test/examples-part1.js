'use strict'

const assert = require('assert').strict

const Computer = require('../lib/computer')

// Example 1

const program = [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]
const computer1 = new Computer(
  program.slice(0)
)

computer1.run()

assert.deepEqual(
  computer1.output,
  program
)

// Example 2

const computer2 = new Computer(
  [1102,34915192,34915192,7,4,7,99,0]
)

computer2.run()

assert.equal(
  String(computer2.output[0]).length,
  16
)


// Example 3

const number = 1125899906842624
const computer3 = new Computer(
  [104,number,99]
)

computer3.run()

assert.equal(
  computer3.output[0],
  number
)
