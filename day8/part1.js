'use strict'

const fs = require('fs')
const Image = require('./lib/image')
const pixels = fs.readFileSync('./input.txt', { encoding: 'utf8' })
  .trim()
  .split('')
  .map(p => parseInt(p))

const image = new Image(25, 6)
const layers = image.parse(pixels)

let selectedLayer

for (const row of Image.stats(layers)) {
  if (!selectedLayer || selectedLayer[0] > row[0]) {
    selectedLayer = row
  }
}

console.log(selectedLayer[1] * selectedLayer[2])
