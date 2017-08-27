'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaFieldGarden extends Location {
  constructor() {
    super({
      name: 'Fortuna - Field Garden',
      characters: {
        boy1: new (class extends Character {
          talkedTo() {
            this.say(`
              You wanna talk to me, mister? I'm way too busy right now. I'm
              playing tag, and I'm it!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  I'm really good at playing tag! We should have a game one
                  day, Dad!
                `)
              }
            ])
          }
        }),

        boy2: new (class extends Character {
          talkedTo() {
            this.say(`
              Not now! Johny's coming, and he's it!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  I don't see what's so much fun about just running about
                  like that. Boys are weird!
                `)
              },

              () => {
                this.game.players.parry.say(`
                  Ees no fair. Parry, he ees just a boy like thees, but he
                  has eso much to worry about.
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
      Just outside of the town of Fortuna is a small patch of field where two
      young boys are chasing each other in circles. You're not sure which one
      is fleeing and which one is chasing!
    `)

    return this.game.prompt(
      'Go back to the far-northern street',
      'Leave the town',
      'Talk to the first boy',
      'Talk to the second boy',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go back to the far-northern street')
        return this.game.goTo('Fortuna/Far-northern')

      else if (selected === 'Leave the town') {
        this.game.logParagraph(`
          But that might not be a very good idea! The world map *still*
          hasn't been implemented oops.
        `)

        return this.continueToIndex()
      }

      else if (selected === 'Talk to the first boy')
        return this.game.talkTo(this.characters.boy1)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the second boy')
        return this.game.talkTo(this.characters.boy2)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
