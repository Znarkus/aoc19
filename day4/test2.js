'use strict'

const s = '223777'

const m = s.match(/(.)\1+/g)

console.log(s, m)
