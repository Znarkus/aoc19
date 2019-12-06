'use strict'

const fs = require('fs')

const wires = fs.readFileSync('./input.txt', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .map(v => v.split(','))

const grid = {}

let shortestDistance

const getGridKey = (x, y, idx) => `${x}x${y}:${idx}`

const drawPoint = (x, y, idx) => {
    for (let otherIdx = 0; otherIdx < wires.length; otherIdx++) {
        if (idx === otherIdx) continue

        if (grid[getGridKey(x, y, otherIdx)]) {
            const d = Math.abs(x) + Math.abs(y)

            console.log('collision', { x, y }, idx, 'd =', d)
            shortestDistance = shortestDistance === undefined
                ? d
                : Math.min(shortestDistance, d)
        }
    }

    grid[getGridKey(x, y, idx)] = true
}

const drawLine = (from, to, idx) => {
    const current = { ...from }
    const dim = from.x !== to.x ? 'x' : 'y'
    const v = from[dim] < to[dim] ? 1 : -1

    for (; current[dim] !== to[dim]; current[dim] += v) {
        if (current.x === 0 && current.y === 0) continue
        drawPoint(current.x, current.y, idx)
    }
}

for (const [idx, wire] of wires.entries()) {
    let x = 0
    let y = 0

    for (const line of wire) {
        const from = { x, y }
        const int = parseInt(line.slice(1))

        switch (line[0]) {
            case 'U':
                y -= int
                break
            case 'R':
                x += int
                break
            case 'D':
                y += int
                break
            case 'L':
                x -= int
                break
            default:
                throw new Error('Wat: ' + line)
        }

        const to = { x, y }

        drawLine(from, to, idx)
    }
}

console.log(shortestDistance)
