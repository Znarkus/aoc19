'use strict'

const FROM = 172851
const TO = 675869
const matches = []

mainloop: for (let i = FROM; i <= TO; i++) {
    let s = String(i)
    if (s.length !== 6) {
        continue
    }

    let chars = s.split('').map(v => parseInt(v))

    const groups = s.match(/(.)\1+/g) || []
    const hasGroup = groups.some(group => group.length === 2)
    // const hasGroup = chars.some((p, idx) => idx < 5 && p === chars[idx + 1])

    if (!hasGroup) {
        continue
    }

    for (let j = 1; j < 6; j++) {
        if (chars[j - 1] > chars[j]) {
            continue mainloop
        }
    }

    matches.push(i)
}

console.log(matches.length)
