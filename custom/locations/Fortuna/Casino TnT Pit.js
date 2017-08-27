'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoTnTPit extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino T\'n\'T Pit',
      characters: {
        oldschoolDude: new (class extends Character {
          talkedTo() {
            this.say(`
              I've been playin' this T'n'T board for thirty years now, and
              I've never got to the end. I enjoy seeing other people fall
              off, though. I've got a great joke about it!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.sancho.say(`
                  Ees no eso fun to watch the others losing, you know. Ees a
                  shame for thees señor.
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
      The T'n'T pit is a standard dusty room. In the ceiling and walls, you
      can see some slides that bring players here from on the board, through
      trapdoors higher up. There's an old man sitting in the middle of the
      room.
    `)

    return this.game.prompt(
      'Go back to the board room',
      'Talk to the old man',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go back to the board room')
        return this.game.goTo('Fortuna/Casino TnT')

      else if (selected === 'Talk to the old man')
        return this.game.talkTo(this.characters.oldschoolDude)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
