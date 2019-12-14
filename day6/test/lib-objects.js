'use strict'

const assert = require('assert').strict
const { parse } = require('../lib/parse')
const { count, find } = require('../lib/objects')

const objects = parse('1)2\n2)3\n3)6\n4)5\n3)4')
const root = find(objects, '1')

assert.equal(root.name, '1')
assert.equal(count(objects), 13)
