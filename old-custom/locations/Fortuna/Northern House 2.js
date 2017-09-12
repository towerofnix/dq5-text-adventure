'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaNorthernHouse2 extends Location {
  constructor() {
    super({
      name: 'Fortuna - Northern House 2',
      characters: {
        oldMan: new (class extends Character {
          talkedTo() {
            this.say(`
              I was a traveller myself, you know, back in the day. Ah, they
              were fine times. Fine times!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  That man was squinting just then. Do you think he was
                  trying to look off into the distance?
                `)
              },

              () => {
                this.game.players.parry.say(`
                  A traveller. How exciting! I suppose we're travellers too,
                  aren't we? Ha ha!
                `)
              }
            ])
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      This one-room house is a cozy one, with a small but functional kitchen,
      a table for two, a bookshelf, and some windows with light shining in
      from outside. Sitting at the table is an old man.
    `)

    return this.game.prompt(
      'Leave the house',
      'Talk to the old man',
      'Party chat'
    ).then(([ selected]) => {

      if (selected === 'Leave the house')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Talk to the old man')
        return this.game.talkTo(this.characters.oldMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
