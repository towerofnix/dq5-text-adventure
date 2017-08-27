'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaInn extends Location {
  constructor() {
    super({
      name: 'Fortuna (Inn)',
      characters: {
        dudeCurio: new (class extends Character {
          talkedTo() {
            this.say(`
              No way! You bought the slime curio?
            `)

            this.say(`
              That's amazing! If I was you, I'd put it on display in a museum
              or something. I mean, it's like, ultra-rare!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  It'd be a waste just to hang it up in a museum somewhere.
                  I want to keep it with me all the time!
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
      You're in a small inn that's brightly decorated with some flower stands
      and windows. Sat at a table is a man eating a simple plate of reddish
      mushrooms. The innkeeper is at a stand, waiting for you to maybe make
      a purchase!
    `)

    return this.game.prompt(
      'Exit the inn',
      'Talk to the man at the table',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Exit the inn') {
        return this.game.goTo('Fortuna')
      }

      else if (selected === 'Talk to the man at the table') {
        return this.game.talkTo(this.characters.dudeCurio)
          .then(() => this.continueToIndex())
      }

      else if (selected === 'Party chat') {
        return this.game.partyChat()
          .then(() => this.continueToIndex())
      }

    })
  }
}
