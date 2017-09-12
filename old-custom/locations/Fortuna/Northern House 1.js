'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaNorthernHouse1 extends Location {
  constructor() {
    super({
      name: 'Fortuna - Northern House 1',
      characters: {
        dwarf: new (class extends Character {
          talkedTo() {
            this.say(`
              Yee-ha... Yee-phew... Yee-ha... Store's only open after dark,
              pardner.
            `)

            this.say(`
              Huh? Is there anything tougher than the Zenethian Equipment?
              There surely is, my friend. The dragon staff, the shimmerin'
              shield, the Pallium Regale and that there sun crown. Them four
              are the strongest pieces of equipment y'ever doggone seen!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Was that man saying all that in his sleep!?
                `)
              },

              () => {
                this.game.players.madchen.say(`
                  What a funny way of snoring he had!
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
      This is a small, single-room house. A few torches and windows adorn the
      walls, and a bed sits on the stone floor. In the southwest corner of
      the room is a bucket of water.
    `)

    this.game.logParagraph(`
      A dwarf is occupying the bed.
    `)

    return this.game.prompt(
      'Leave the house',
      'Talk to the dwarf',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the house')
        return this.game.goTo('Fortuna/Northern')

      else if (selected === 'Talk to the dwarf')
        return this.game.talkTo(this.characters.dwarf)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
