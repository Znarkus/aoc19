'use strict'

const fs = require('fs')

const result = fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map(v => {
        let s = 0
        do {
            const f = Math.floor(v / 3) - 2
            console.log(f)
            if (f <= 0) break
            v = f
            s += f
        } while (true)
        console.log('s', s)
        return s
    })
    .reduce((ack, cur) => ack + cur, 0)

console.log(result)
