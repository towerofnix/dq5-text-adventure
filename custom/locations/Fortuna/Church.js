'use strict'

const Location = require('../../../Location')

module.exports = class FortunaChurch extends Location {
  constructor() {
    super({
      name: 'Fortuna - Church',
      characters: {
        priest: new (require('../../characters/npc/Priest'))
      }
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The church is a fairly open one, with no doors in the exit and no
      ceiling to block the view of the sky. In the centre of the room is a
      table with two lit candles set on it, and the priest standing behind
      it. Sitting on another table in the back of the room is some kind of
      a symbolic statue.
    `)

    return this.game.prompt(
      'Leave the church',
      'Talk to the priest',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the church')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Talk to the priest')
        return this.game.talkTo(this.characters.priest)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
