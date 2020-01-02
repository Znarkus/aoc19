'use strict'

const path = require('path')
const lib = require('./lib/asteroids')

const asteroids = lib.parseMap(lib.load(path.resolve(__dirname, 'input.txt')))

lib.precalcAsteroids(asteroids)

const best = lib.findBestPosition(asteroids)

console.log(best)
