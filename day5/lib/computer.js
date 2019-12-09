'use strict'

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

class Computer {
  input
  program

  constructor (input, program) {
    this.input = input
    this.program = program
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

  run () {
    mainloop: for (let pos = 0; pos < this.program.length;) {
      const op = Computer.parseOpcode(this.program[pos])
      const instruction = INSTRUCTIONS[op.code]

      if (!instruction) {
        throw new Error(`Cannot find description for opcode ${op.code}`)
      }

      // console.log(program)
      // console.log('instruction =', instruction, 'op =', op)
      const params = this.program
        .slice(pos + 1, pos + 1 + instruction.params)
        .map((p, i) => {
          pos++
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
          result = this.input
          break

        case 4:
          console.log(params[0])
          break

        case 5:
          if (params[0] !== 0) {
            pos = params[1]
            continue
          }

          break

        case 6:
          if (params[0] === 0) {
            pos = params[1]
            continue
          }

          break

        case 7:
          result = params[0] < params[1] ? 1 : 0
          break

        case 8:
          result = params[0] === params[1] ? 1 : 0
          break

        case 99:
          break mainloop

        default:
          throw new Error(`Unknown opcode: ${op.code}`)
      }

      if (instruction.store) {
        pos++
        const resultpos = this.program[pos]
        // console.log('resultpos =', resultpos)
        this.program[resultpos] = result
      }

      pos++
    }
  }
}

module.exports = Computer
