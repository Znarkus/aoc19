'use strict'

const assert = require('assert').strict
const path = require('path')
const lib = require('../lib/simulator')

// Example 1

const positions = lib.parse(lib.load(path.resolve(__dirname, 'example1-1.txt')))

let totalSteps = 0
// let tree = {}
let steplog = {}

const stepCb = (moons) => {
  // steps.push(JSON.parse(JSON.stringify(moons)))

  const h = moons.map(
    m => Object.values(m.position).concat(Object.values(m.velocity)).join(',')
  ).join(';')

  if (steplog[h]) {
    console.log('Found repeat')
    return true
  }

  steplog[h] = true

  // const h = moons.map(
  //   m => Object.values(m.position).concat(Object.values(m.velocity))
  // ).reduce((ack, cur) => ack.concat(cur), [])
  //
  // let found = true
  // let p = tree
  //
  // for (const n of h) {
  //   if (!p[n]) {
  //     found = false
  //     p[n] = {}
  //   }
  //
  //   p = p[n]
  // }
  //
  // if (found) {
  //   console.log('Found repeat')
  //   return true
  // }

  totalSteps++

  if (totalSteps % 100000 === 0) console.log(totalSteps)
}

// Example 1

lib.runSimulation(positions, 999999999, { stepCb })

assert.equal(totalSteps, 2772)

// Example 2

totalSteps = 0
// tree = {}
steplog = {}

lib.runSimulation(
  lib.parse(lib.load(path.resolve(__dirname, 'example1-2.txt'))),
  9999999999,
  { stepCb }
)

assert.equal(totalSteps, 4686774924)
