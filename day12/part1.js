'use strict'

const path = require('path')
const lib = require('./lib/simulator')

const positions = lib.parse(lib.load(path.resolve(__dirname, 'input.txt')))

const steps = lib.runSimulation(positions, 1000)

console.log('Energy:', lib.calcTotalEnergy(steps[1000]))
