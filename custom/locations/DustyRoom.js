'use strict'

const Location = require('../../Location')

module.exports = class DustyRoom extends Location {
  constructor() {
    super({
      name: 'Dusty Room'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`What a strange room.`)
  }
}
