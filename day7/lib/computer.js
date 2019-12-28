'use strict'

const { EventEmitter } = require('events')
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
  5: {
    params: 2,
  },
  6: {
    params: 2,
  },
  7: {
    params: 2,
    store: true,
  },
  8: {
    params: 2,
    store: true,
  },
  99: {
    params: 0,
  }
}

class Computer extends EventEmitter {
  input = []
  program
  output = []
  state = 'fresh'
  pos

  constructor (input, program) {
    super()
    this.input = input
    this.program = program
    this.inputIt = this.getInputs()
  }

  static parseOpcode (opcode) {
    opcode = String(opcode)

    if (opcode.length === 1) {
      return { code: parseInt(opcode), paramModes: [0, 0, 0] }
    } else if (opcode.length >= 2 && opcode.length <= 4) {
      return {
        code: parseInt(opcode.slice(-2)),
        paramModes: opcode // -> 1101
          .slice(0, -2) // -> 11
          .padStart(3, '0') // -> 011
          .split('') // -> [ '0', '1', '1' ]
          .reverse() // -> [ '1', '1', '0' ]
          .map((v, i) => parseInt(v))
      }
    } else {
      throw new Error(
        `Invalid opcode: ${JSON.stringify(opcode)} (length=${opcode.length})`
      )
    }
  }

  *getInputs () {
    for (const input of this.input) {
      yield input
    }
  }

  run () {
    if (this.state === 'fresh') {
      this.pos = 0
    }

    this.state = 'running'

    while (this.pos < this.program.length && this.state === 'running') {
      this.tick()
    }

    if (this.state === 'running') {
      this.state = 'exited'
    }
  }

  tick () {
    const op = Computer.parseOpcode(this.program[this.pos])
    const instruction = INSTRUCTIONS[op.code]

    if (!instruction) {
      throw new Error(`Cannot find description for opcode ${op.code}`)
    }

    // console.log(this.program)
    // console.log('instruction =', instruction, 'op =', op)
    const params = this.program
      .slice(this.pos + 1, this.pos + 1 + instruction.params)
      .map((p, i) => {
        this.pos++
        if (op.paramModes[i] === 0) {
          // By ref
          return parseInt(this.program[p])
        } else {
          // By val
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
        const it = this.inputIt.next()
        if (it.done) throw new Error('No more inputs')
        result = it.value
        // console.log('INPUT', result)
        break

      case 4:
        const output = params[0]
        // console.log('PROGRAM OUTPUT', output)
        this.emit('output', output)
        // yield output
        this.output.push(output)
        break

      case 5:
        if (params[0] !== 0) {
          this.pos = params[1]
          return
        }

        break

      case 6:
        if (params[0] === 0) {
          this.pos = params[1]
          return
        }

        break

      case 7:
        result = params[0] < params[1] ? 1 : 0
        break

      case 8:
        result = params[0] === params[1] ? 1 : 0
        break

      case 99:
        this.state = 'break'
        break

      default:
        throw new Error(`Unknown opcode: ${op.code}`)
    }

    if (instruction.store) {
      this.pos++
      const resultpos = this.program[this.pos]
      // console.log('resultpos =', resultpos, 'result =', result)
      this.program[resultpos] = result
    }

    if (this.state === 'break') {
      return
    }

    this.pos++
  }
}

module.exports = Computer
