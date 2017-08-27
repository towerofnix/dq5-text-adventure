'use strict'

const {values} = require('./util')

module.exports = class Location {
  constructor({
    // Name of this location - used in maps, etc.
    name = 'An Unnamed Location',

    // Characters in this location.
    characters = []
  } = {}) {
    this.name = name
    this.characters = characters
  }

  // Events -------------------------------------------------------------------

  // Called when the location has been gone to by the player or a script.
  goneTo() {}

  // Called after goneTo. Expect this to be called multiple times per visit.
  index() {
    return Promise.resolve()
  }


  // Methods ------------------------------------------------------------------

  // Talk to a character, by the character's key in the this.characters.
  talkTo(characterKey) {
    this.characters[characterKey].talkedTo()
  }

  // Internal method used to assign the game to this location, as well as all
  // of its characters.
  assignGame(game) {
    this.game = game

    for (let character of values(this.characters)) {
      character.assignGame(game)
    }
  }

  // Use this in a promise.then.
  continueToIndex() {
    return this.game.prompt('Continue..')
      .then(() => this.index())
  }
}
