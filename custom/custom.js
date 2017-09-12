'use strict'

const Game = require('../Game')

module.exports = class CustomGameClass extends Game {
  constructor() {
    super({
      players: {
        hero: new (require('./characters/Hero'))
      },

      defaultSave: {
        location: 'DustyRoom'
      }
    })
  }

  start() {
    return this.load()
  }
}
