'use strict'

const Character = require('../../../Character')

module.exports = class Monty extends Character {
  constructor() {
    super({
      name: 'Monty'
    })
  }

  talkedTo() {
    this.say(`
      I'm Monty, the famous monster monitor. I take care of folks' monsters
      for them. What can I do for you today?
    `)

    this.say(`
      ..Oh, I don't quite work yet? That's too bad, perhaps you could come
      another time.
    `)
  }
}
