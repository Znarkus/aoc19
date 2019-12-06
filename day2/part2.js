'use strict'

const fs = require('fs')

// const memory = { 0: 12, 1: 2 }
const programCode = fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .split(',')
    .map(v => parseInt(v))

paramloop: for (let param1 = 0; param1 < 100; param1++) {
    for (let param2 = 0; param2 < 100; param2++) {
        const program = programCode.slice(0)

        program[1] = param1
        program[2] = param2

        mainloop: for (let pos = 0; pos < program.length; pos += 4) {
            const op = program.slice(pos, pos + 4)
            const params = [program[op[1]], program[op[2]]]

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

        if (program[0] === 19690720) {
            console.log('param 1', param1)
            console.log('param 2', param2)
            break paramloop
        }
    }
}
