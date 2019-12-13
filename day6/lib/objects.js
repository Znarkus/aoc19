'use strict'

exports.find = (objects, name) => {
  return Object.values(objects).find(o => o.name === name)
}

exports.count = objects => {
  let count = 0

  for (const [k, v] of Object.entries(objects)) {
    // console.log('=======================', v.name)
    for (let n = v.parent; n; n = n.parent) {
      // console.log('<-', n.name)
      count++
    }
  }

  return count
}
