'use strict'

const assert = require('assert').strict

const Computer = require('../lib/computer')

function run (program, input = null) {
  const com = new Computer(program)
  if (input !== null) com.input = input
  com.run()
  return com
}

// Add
assert.deepEqual(
  run([1, 0, 0, 5, 99]).program,
  [1, 0, 0, 5, 99, 2]
)

// Param modes
assert.deepEqual(
  run([1101, 9, 8, 5, 99]).program,
  [1101, 9, 8, 5, 99, 17]
)

// Rel base
assert.deepEqual(
  run([3, 3, 109, 0, 1205, 2, 8, -99, 99], [1]).program,
  [3, 3, 109, 1, 1205, 2, 8, -99, 99]
)

// 109
assert.deepEqual(
  run([109, -1, 4, 1, 99]).output,
  [-1]
)

assert.deepEqual(
  run([109, -1, 104, 1, 99]).output,
  [1]
)

assert.deepEqual(
  run([109, -1, 204, 1, 99]).output,
  [109]
)

assert.deepEqual(
  run([109, 1, 9, 2, 204, -6, 99]).output,
  [204]
)

assert.deepEqual(
  run([109, 1, 109, 9, 204, -6, 99]).output,
  [204]
)

assert.deepEqual(
  run([109, 1, 3, 3, 204, 2, 99], [999999999999999]).output,
  [999999999999999]
)

assert.deepEqual(
  run([109, 1, 203, 2, 204, 2, 99], [999999999999999]).output,
  [999999999999999]
)
