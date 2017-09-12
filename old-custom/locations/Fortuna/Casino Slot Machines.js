'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoSlotMachines extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino Slot Machines',
      characters: {
        frustratedLady: new (class extends Character {
          talkedTo() {
            this.say(`
              I just don't ever seem to get a win. Do you think someone's
              inside there, fixing the results?
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Imagine what it would be like to be cramped up inside
                  there!
                `)
              }
            ])
          }
        }),

        happyMan: new (class extends Character {
          talkedTo() {
            this.say(`
              Wahoo! Another win for Lucky Larry! I'm on such a roll today!
            `)

            this.game.removePartyChatScene(loc.talkScene)
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      There's three tiers of slot machines at the casino in Fortuna - four
      1-token machines, four 10-token machines, and one 100-token machine.
    `)

    this.game.logParagraph(`
      Standing by the 100-token slot machine is a man with a happy expression
      on his face. Walking between the 1-token and 10-token machines is a
      frustrated lady.
    `)

    return this.game.prompt(
      'Never mind slots!',
      'Try a 1-token game of slots',
      'Try a 10-token game of slots',
      'Try the big 100-token game of slots',
      'Talk to the frustrated lady',
      'Talk to the happy man',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Never mind slots!')
        return this.game.goTo('Fortuna/Casino Eastern')

      else if (
        selected === 'Try a 1-token game of slots'
        || selected === 'Try a 10-token game of slots'
      ) {
        // TODO: Slot machines
        this.game.logParagraph(`
          Slot machines haven't been implemented yet, sadly.. come back
          again another time?
        `)
        return this.continueToIndex()
      }

      else if (selected === 'Try the big 100-token game of slots') {
        // TODO: Slot machines
        this.game.logParagraph(`
          I know you'd *love* to throw your tokens away, but right now the
          slot machines aren't implemented yet, sorry..
        `)
        return this.continueToIndex()
      }

      else if (selected === 'Talk to the frustrated lady')
        return this.game.talkTo(this.characters.frustratedLady)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the happy man')
        return this.game.talkTo(this.characters.happyMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
