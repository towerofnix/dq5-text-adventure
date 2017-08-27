'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaWesternWalls extends Location {
  constructor() {
    super({
      name: 'Fortuna - Western Walls',
      characters: {
        knight: new (class extends Character {
          talkedTo() {
            this.say(`
              I'm just passing through here. I travel the world in search of
              the strongest weapons and the stoutest armour.
            `)

            this.say(`
              Everyone thinks of the so-called Zenithian Equipment when I say
              that. But only the legendary hero can use that. No, I've heard
              of even mightier weapons and armour in the world.
            `)

            this.game.partyChatInit([
              () => {
                this.game.players.parry.say(`
                  If he's that determined to find these strong weapons and
                  armour, it probably means he's not very confident in his
                  own strength.
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  Maybe ees true. The equipment from Zenthia, ees no eso new
                  now. Maybe the modern weapons and armour, they are
                  stronger.
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
        this.game.players.sancho.say(`
          Uf... Ees eso many walls een thees town. You no feel trapped? I, I
          can no breathe eso well...
        `)

        this.game.players.sancho.say(`
          Even eenside Gotha Castle eet feels more open than thees. You no
          theenk eso, friend?
        `)
      },

      // TODO: Move this to eastern
      () => {
        this.game.players.madchen.say(`
          This town is so big, I'm sure I'd get lost in it in an instant.
          Don't let go of my hand, will you, Dad?
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You're surrounded in walls. Going southwest would lead you back to the
      main western part of the town. There's also a way out towards the
      northeast, and a poster on the wall that might have something to do
      with that.
    `)

    this.game.logParagraph(`
      There's a knight reading the poster.
    `)

    return this.game.prompt(
      'Go southwest',
      'Go northeast',
      'Read the poster',
      'Talk to the knight',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Go southwest')
        return this.game.goTo('Fortuna/Western')

      else if (selected === 'Go northeast')
        return this.game.goTo('Fortuna/The Old Curiosity Shop')

      else if (selected === 'Read the poster') {
        this.game.logParagraph(`
          'The Old Curiosity Shop. Your one-stop source of all things curio,
          served with a city-wide smile.'
        `)
        return this.continueToIndex()
      }

      else if (selected === 'Talk to the knight')
        return this.game.talkTo(this.characters.knight)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
