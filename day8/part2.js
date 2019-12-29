'use strict'

const fs = require('fs')
const Image = require('./lib/image')
const pixels = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .trim()
  .split('')
  .map(p => parseInt(p))

const image = new Image(25, 6)
const layers = image.parse(pixels)
const merged = image.merge(layers)

const message = merged
  .map(row => {
    return row
      .map(p => p === 1 ? ' x ' : '   ')
      .join('')
  })
  .join('\n')

console.log(message)
