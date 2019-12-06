'use strict'

const fs = require('fs')

// const memory = { 0: 12, 1: 2 }
const program = fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .split(',')
    .map(v => parseInt(v))

program[1] = 12
program[2] = 2

console.log(program)

mainloop: for (let pos = 0; pos < program.length; pos += 4) {
    const op = program.slice(pos, pos + 4)
    const params = [program[op[1]], program[op[2]]]
    console.log(op, params)
    let result

    switch (op[0]) {
        case 1:
            result = params[0] + params[1]
            break

        case 2:
            result = params[0] * params[1]
            break

        case 99:
            break mainloop
    }

    program[op[3]] = result
}

console.log(program[0])
