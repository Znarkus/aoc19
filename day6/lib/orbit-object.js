'use strict'

class OrbitObject {
  name
  parent
  orbit = {}

  constructor (name) {
    this.name = name
  }

  addOrbit (object) {
    this.orbit[object.name] = object
    object.parent = this
  }

  isLeaf () {
    return !Object.keys(this.orbit).length
  }

  isRoot () {
    return !this.parent
  }

  *iterateParents () {
    for (let n = this.parent; n; n = n.parent) {
      yield n
    }
  }
}

module.exports = OrbitObject
