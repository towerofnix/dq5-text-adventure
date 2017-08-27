'use strict'

module.exports = class Character {
  constructor({
    // Name of the character.
    name = '*'
  } = {}) {
    this.name = name
  }


  // Methods ----------------------------------------------------------------

  // Say something.
  say(text) {
    console.log(`{\x1b[2m${this.name}\x1b[0m}`)
    this.game.logParagraph(text)
  }

  // Internal method used to assign the game to this character.
  assignGame(game) {
    this.game = game
  }
}
