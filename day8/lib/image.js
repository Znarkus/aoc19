'use strict'

class Image {
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  static stats (layers) {
    return layers.map((layer, i) => {
      return layer.reduce((ack, cur) => {
        cur.reduce((ack, cur) => {
          ack[cur] = ack[cur] || 0
          ack[cur]++
          return ack
        }, ack)
        return ack
      }, {})
    })
  }

  merge (layers) {
    const merged = []

    for (let y = 0; y < this.height; y++) {
      const row = []

      for (let x = 0; x < this.width; x++) {
        for (const layer of layers) {
          if (layer[y][x] !== 2) {
            row.push(layer[y][x])
            break
          }
        }
      }

      merged.push(row)
    }

    return merged
  }

  parse (pixels) {
    const layers = []
    let layer = []
    let row = []

    for (const [i, pixel] of pixels.entries()) {
      row.push(pixel)

      if (row.length === this.width) {
        layer.push(row)
        row = []
      }

      if (layer.length === this.height) {
        layers.push(layer)
        layer = []
      }
    }

    return layers
  }
}

module.exports = Image
