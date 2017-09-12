'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoDressingRoom extends Location {
  constructor() {
    super({
      name: 'Fortuna - Dressing Room',
      characters: {
        actor1: new (class extends Character {
          talkedTo() {
            this.say(`
              This is our changing room. Don't go peeking in the closets,
              okay?
            `)
          }
        }),

        actor2: new (class extends Character {
          talkedTo() {
            this.say(`
              The boss said he's gonna let that travellin' theatre group take
              the stage durin' the day.
            `)
          }
        }),

        actor3: new (class extends Character {
          talkedTo() {
            this.say(`
              Hey! You ain't allowed to come in here when we're changin'!
              Even if you are a casino customer.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  She told you off, Dad!
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
      Oops! It looks like you've ended up in the dressing room for all the
      actors of this play - and there's still some people here, applying
      makeup and such.
    `)

    return this.game.prompt(
      'Head back to the play',
      'Talk to the first actor',
      'Talk to the second actor',
      'Talk to the third actor',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back to the play')
        return this.game.goTo('Fortuna/Casino Play')

      else if (selected === 'Talk to the first actor')
        return this.game.talkTo(this.characters.actor1)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the second actor')
        return this.game.talkTo(this.characters.actor2)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the third actor')
        return this.game.talkTo(this.characters.actor3)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
