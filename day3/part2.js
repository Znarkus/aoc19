'use strict'

const { fromFile } = require('./lib/loader')
const Grid = require('./lib/grid')

const grid = new Grid(fromFile('./input.txt'))

grid.draw()

console.log('shortestDistance =', grid.shortestDistance)
console.log('shortestLength =', grid.shortestLength)
