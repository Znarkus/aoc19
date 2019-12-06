'use strict'

const fs = require('fs')

exports.fromFile = (path) => {
  return exports.fromString(fs.readFileSync(path, { encoding: 'utf8' }))
}

exports.fromString = (string) => {
  return string
    .split('\n')
    .filter(Boolean)
    .map(v => v.split(','))
}
