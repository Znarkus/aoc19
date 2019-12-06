'use strict'

const fs = require('fs')

const result = fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map(v => Math.floor(v / 3) - 2)
    .reduce((ack, cur) => ack + cur, 0)

console.log(result)
