'use strict'

const fs = require('fs')
const { parseOpcode } = require('./lib/compiler')

const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .split(',')

const INPUT = 1

const INSTRUCTIONS = {
  1: {
    params: 2,
    store: true,
    // fn: (...params) => params[0] + params[1],
  },
  2: {
    params: 2,
    store: true,
    // fn: (...params) => params[0] * params[1],
  },
  3: {
    params: 0,
    store: true,
    // fn: () => INPUT,
  },
  4: {
    params: 1,
  },
  99: {
    params: 0,
  }
}

mainloop: for (let pos = 0; pos < program.length;) {
  const op = parseOpcode(program[pos])
  const instruction = INSTRUCTIONS[op.code]

  if (!instruction) {
    throw new Error(`Cannot find description for opcode ${op.code}`)
  }

  // console.log(program)
  // console.log('instruction =', instruction, 'op =', op)
  const params = program
    .slice(pos + 1, pos + 1 + instruction.params)
    .map((p, i) => {
      pos++
      if (op.paramModes[i] === 0) {
        return parseInt(program[p])
      } else {
        return parseInt(p)
      }
    })

  // console.log('param values =', params)

  let result

  switch (op.code) {
    case 1:
      result = params[0] + params[1]
      break

    case 2:
      result = params[0] * params[1]
      break

    case 3:
      result = INPUT
      break

    case 4:
      console.log(params[0])
      break

    case 99:
      break mainloop

    default:
      throw new Error(`Unknown opcode: ${op.code}`)
  }

  if (instruction.store) {
    pos++
    const resultpos = program[pos]
    // console.log('resultpos =', resultpos)
    program[resultpos] = result
  }

  pos++
}

console.log('program first address =', program[0])
