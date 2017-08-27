'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class Fortuna extends Location {
  constructor() {
    super({
      name: 'Fortuna',
      characters: {
        casinoMan: new (class extends Character {
          talkedTo() {
            this.say(`
              Oh, yeah! I win! You know, every losing streak has to end
              sometime. That's the lesson here. I'm on fire now!
            `)

            this.game.partyChatInit([
              () => {
                this.game.players.madchen.say(`
                  Did you see that man before? He was crying. Don't you cry,
                  will you, Dad?
                `)
              }
            ])
          }
        })
      }
    })
  }

  goneTo() {
    this.game.partyChatInit([
      () => {
        this.game.players.parry.say(`
          When we came here before with Sancho, I watched a race at the
          slurpodrome. Have you ever seen one, Dad? They're really good fun!
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You're at the casino entrance, as is evident by the huge blinking
      casino light! The doors are shut, but it's probably not closed - you
      can hear many sounds from inside. A man is standing by the door,
      gleaming at some casino tokens in his hands.
    `)

    return this.game.prompt(
      'Go through the casino doors',
      'Head back to town',
      'Talk to the man',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back to town')
        return this.game.goTo('Fortuna')

      else if (selected === 'Go through the casino doors')
        return this.game.goTo('Fortuna/Casino')

      else if (selected === 'Talk to the man')
        return this.game.talkTo(this.characters.casinoMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
