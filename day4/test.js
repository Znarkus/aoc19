'use strict'

const chars = [ 2, 2, 3, 7, 7, 7 ]
// for (let j = 1; j < 6; j++) {
//     if (chars[j - 1] > chars[j]) {
//         console.log('nope')
//     }
// }

const hasGroup = chars.some((p, idx) => {
    if (idx <= 4 && p === chars[idx + 2]) {
        return false
    }

    return idx < 5 && p === chars[idx + 1]
})

console.log(hasGroup)
// console.log('yes')
