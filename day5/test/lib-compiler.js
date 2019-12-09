'use strict'

const assert = require('assert').strict
const { parseOpcode } = require('../lib/compiler')

assert.deepEqual(parseOpcode('1101'), { code: 1, paramModes: [1, 1, 0] })
assert.deepEqual(parseOpcode('1'), { code: 1, paramModes: [0, 0, 0] })
