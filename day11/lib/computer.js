'use strict'

const { EventEmitter } = require('events')

const INSTRUCTIONS = {
  1: {
    desc: 'add',
    params: 2,
    store: true,
    fn (params) {
      return params[0] + params[1]
    },
  },
  2: {
    desc: 'multiply',
    params: 2,
    store: true,
    fn (params) {
      return params[0] * params[1]
    },
  },
  3: {
    desc: 'input',
    params: 0,
    store: true,
    fn (params) {
      const it = this.inputIt.next()
      if (it.done) throw new Error('No more inputs')
      return it.value
    },
  },
  4: {
    desc: 'output',
    params: 1,
    fn (params) {
      const output = params[0]
      // console.log('PROGRAM OUTPUT', output)
      this.emit('output', output)
      this.output.push(output)
    },
  },
  5: {
    desc: 'jump-if-true',
    params: 2,
    fn (params) {
      if (params[0] !== 0) {
        this.pos = params[1]
        return 'exit_tick'
      }
    }
  },
  6: {
    desc: 'jump-if-false',
    params: 2,
    fn (params) {
      if (params[0] === 0) {
        this.pos = params[1]
        return 'exit_tick'
      }
    }
  },
  7: {
    desc: 'less-than',
    params: 2,
    store: true,
    fn (params) {
      return params[0] < params[1] ? 1 : 0
    }
  },
  8: {
    desc: 'equals',
    params: 2,
    store: true,
    fn (params) {
      return params[0] === params[1] ? 1 : 0
    }
  },
  9: {
    desc: 'add-to-relative-base',
    params: 1,
    fn (params) {
      this.relBase += params[0]
      // console.log('this.relBase =', this.relBase)
    }
  },
  99: {
    desc: 'break',
    params: 0,
    fn (params) {
      this.state = 'break'
      return 'exit_tick'
    }
  }
}

class Computer extends EventEmitter {
  input = []
  program
  output = []
  state = 'fresh'
  pos
  relBase = 0

  constructor (program) {
    super()
    this.program = program
    this.inputIt = this.getInputs()
  }

  static parseOpcode (opcode) {
    opcode = String(opcode)

    if (opcode.length === 1) {
      return { code: parseInt(opcode), paramModes: [0, 0, 0] }
    } else if (opcode.length >= 2 && opcode.length <= 5) {
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

    // while (this.pos < this.program.length && this.state === 'running') {
    while (this.state === 'running') {
      this.tick()
    }

    if (this.state === 'running') {
      this.state = 'exited'
    }
  }

  read (pos = null) {
    return this.program[pos !== null ? pos : this.pos]
      || 0
  }

  tick () {
    const op = Computer.parseOpcode(this.read())
    const instruction = INSTRUCTIONS[op.code]

    if (!instruction) {
      throw new Error(`Cannot find description for opcode ${op.code}`)
    }

    const params = this.program
      .slice(this.pos + 1, this.pos + 1 + instruction.params)
      .map((p, i) => {
        this.pos++
        switch (op.paramModes[i]) {
          case 0:
            // By ref
            return parseInt(this.read(p))
          case 1:
            // By val
            return parseInt(p)
          case 2:
            // Rel
            return parseInt(this.read(this.relBase + p))
          default:
            throw new Error(`Invalid mode ${op.paramModes[i]}`)
        }
      })

    const result = instruction.fn.apply(this, [params])

    if (result === 'exit_tick') {
      return
    }

    if (instruction.store) {
      this.pos++

      const resultpos = (op.paramModes[instruction.params] === 2 ? this.relBase : 0)
        + this.read()

      this.program[resultpos] = result
    }

    this.pos++
  }
}

module.exports = Computer
