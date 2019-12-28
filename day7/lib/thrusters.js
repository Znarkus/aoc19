'use strict'

const Computer = require('./computer')

// https://stackoverflow.com/a/20871714/138023
exports.permutations = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(inputArr)

  return result;
}

exports.maximizeThrusters = (program) => {
  const max = {}

  const sequences = exports.permutations([0, 1, 2, 3, 4])

  for (const sequence of sequences) {
    const output = exports.runPhaseSequence(sequence, program)

    if (!max.output || max.output < output) {
      max.output = output
      max.sequence = sequence
    }
  }

  return max
}

exports.feedbackLoop = (program) => {
  const max = {}

  const sequences = exports.permutations([5, 6, 7, 8, 9])

  for (const sequence of sequences) {
    const output = exports.runFeedbackLoop(sequence, program)

    if (!max.output || max.output < output) {
      max.output = output
      max.sequence = sequence
    }
  }

  return max
}

exports.runFeedbackLoop = (phaseSettingsSequence, program) => {
  let lastOutput = 0
  let lastState

  const computers = {}

  do {
    for (const phase of phaseSettingsSequence) {
      if (!computers[phase]) {
        const programCopy = [...program]
        computers[phase] = new Computer([phase, lastOutput], programCopy)
      }

      const computer = computers[phase]

      if (computer.state === 'fresh') {
        computer.on('output', output => {
          // console.log('PROGRAM OUTPUT', output)
          lastOutput = output
          computer.state = 'pause'
        })
      } else {
        computer.input.push(lastOutput)
      }

      computer.run()
      lastState = computer.state
    }
  } while (lastState === 'pause')

  return lastOutput
}

exports.runPhaseSequence = (phaseSettingsSequence, program) => {
  let lastOutput = 0

  for (const phase of phaseSettingsSequence) {
    const programCopy = [...program]
    const computer = new Computer([phase, lastOutput], programCopy)
    computer.run()
    lastOutput = computer.output[0]
  }

  return lastOutput
}
