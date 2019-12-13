'use strict'

const OrbitObject = require('./orbit-object')

exports.parse = string => {
  return string
    .split('\n')
    .filter(Boolean)
    .reduce((ack, cur) => {
      const [inner, outer] = cur.split(')')
      ack[outer] = ack[outer] || new OrbitObject(outer)
      ack[inner] = ack[inner] || new OrbitObject(inner)
      ack[inner].addOrbit(ack[outer])
      return ack
    }, {})
}
