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

exports.measurePath = (objects, from, to) => {
  const fromParentNames = []

  for (const p of from.iterateParents()) {
    fromParentNames.push(p.name)
  }

  const toParentsPath = []

  for (const p of to.iterateParents()) {
    toParentsPath.push(p.name)

    const idxCommonParent = fromParentNames.indexOf(p.name)

    if (idxCommonParent !== -1) {
      // fromParentNames.slice(0, idxCommonParent) -> first parent until common parent
      // -1 -> Remove common
      return toParentsPath.length - 1 + idxCommonParent
    }
  }
}
