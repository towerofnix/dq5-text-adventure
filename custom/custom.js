'use strict'

const Game = require('../Game')

module.exports = class CustomGameClass extends Game {
  constructor() {
    super({
      players: {
        hero: new (require('./characters/Hero')),
        parry: new (require('./characters/Parry')),
        madchen: new (require('./characters/Madchen')),
        sancho: new (require('./characters/Sancho'))
      }
    })
  }

  start() {
    return this.load()
  }
}
