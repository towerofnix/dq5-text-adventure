'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoEastern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Eastern Casino',
      characters: {
        tokenTrader: new (class extends Character {
          talkedTo() {
            this.say(`
              You can trade in your casino tokens here for all sorts of
              exciting things.
            `)

            this.say(`
              You currently have ${this.game.casinoTokens}. Would you like to
              exchange them for a prize?
            `)

            return this.game.promptYesNo()
              .then((choice) => {
                if (choice) {
                  // TODO: Casino token trading
                  this.say(`
                    Oops, it looks like our treasure deposits are empty at
                    the moment.. sorry for the troubles!
                  `)
                } else {
                  this.say(`
                    Thanks for your custom. Come again soon!
                  `)
                }
              })
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The eastern side of the casino seems to mostly be filled up with slot
      machines, each in rows representing the tier of the price (and -
      presumably - reward).
    `)

    this.game.logParagraph(`
      There's a bunny lady standing behind a stand, in front of some chests.
      It looks like you can trade your casino tokens for treasures there.
    `)

    this.game.logParagraph(`
      At the end of the room, there's a small bar with a few people sat
      around the table.
    `)

    return this.game.prompt(
      'Head back to the casino main',
      'Check out the slot machines',
      'Trade in some casino tokens',
      'See how the bar is going',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back to the casino main')
        return this.game.goTo('Fortuna/Casino')

      else if (selected === 'Check out the slot machines') {
        return this.game.goTo('Fortuna/Casino Slot Machines')
      }

      else if (selected === 'Trade in some casino tokens') {
        return this.game.talkTo(this.characters.tokenTrader)
          .then(() => this.continueToIndex())
      }

      else if (selected === 'See how the bar is going') {
        return this.game.goTo('Fortuna/Casino Bar')
      }

      else if (selected === 'Party chat') {
        return this.game.partyChat()
          .then(() => this.continueToIndex())
      }

    })
  }
}
