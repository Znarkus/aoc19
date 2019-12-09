'use strict'

exports.parseOpcode = opcode => {
  opcode = String(opcode)

  if (opcode.length === 1) {
    return { code: parseInt(opcode), paramModes: [0, 0, 0] }
  } else if (opcode.length >= 2 && opcode.length <= 4) {
    return {
      code: parseInt(opcode.slice(-2)),
      paramModes: opcode // -> 1101
        .slice(0, -2) // -> 11
        .padStart(3, '0') // -> 011
        .split('') // -> [ '0', '1', '1' ]
        .reverse() // -> [ '1', '1', '0' ]
        .map((v, i) => parseInt(v))
    }
  } else {
    throw new Error(
      `Invalid opcode: ${JSON.stringify(opcode)} (length=${opcode.length})`
    )
  }
}
