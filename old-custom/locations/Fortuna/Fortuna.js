'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class Fortuna extends Location {
  constructor() {
    super({
      name: 'Fortuna',
      characters: {
        thugWelcome: new (class extends Character {
          talkedTo() {
            this.say(`
              This here's the town of Fortuna, the land of hope and glory! I
              think it's quite a nice place to be. Hopefully you'll enjoy
              your stay, and also perhaps my incredibly long message!
            `)
          }
        })
      }
    })
  }

  goneTo() {
    const scene = [
      () => {
        this.game.players.parry.say(`
          This place is pretty lively! I'm feeling all impatient now. I just
          want to explore and have fun!
        `)
      },

      () => {
        this.game.players.sancho.say(`
          Ees alive een the day, but een the night, ees even more alive!
        `)
      }
    ]

    // TODO: day/night
    if (this.day || true) {
      scene.push(() => {
        this.game.players.madchen.say(`
          I can smell drink in the air, and it's still only daytime!
        `)
      })
    }

    this.game.partyChatInit(scene)
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      Fortuna is a big town! All around are houses, shops, and other various
      attractions.
    `)

    this.game.logParagraph(`
      Of particluar interest nearby is a huge casino to the north, an inn to
      the west, and a weapon shop to the east. There's also various other
      things to the east and west in the large town.
    `)

    this.game.logParagraph(`
      A large man is standing on the paved path, ready to greet any visitors
      (such as you!).
    `)

    return this.game.prompt(
      'Leave the town',
      'Talk to the man',
      'Go into the inn',
      'Go to the casino',
      'Check out the western part of the town',
      'Check out the eastern part of the town',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Talk to the man')
        return this.game.talkTo(this.characters.thugWelcome)
          .then(() => this.continueToIndex())

      else if (selected === 'Go into the inn')
        return this.game.goTo('Fortuna/Inn')

      else if (selected === 'Go to the casino')
        return this.game.goTo('Fortuna/Casino Entrance')

      else if (selected === 'Check out the western part of the town')
        return this.game.goTo('Fortuna/Western')

      else if (selected === 'Check out the eastern part of the town')
        return this.game.goTo('Fortuna/Eastern')

      else if (selected === 'Leave the town') {
        this.game.logParagraph(`
          But leaving the town wouldn't be a very good idea! After all, the
          world map hasn't been implemented yet.
        `)

        return this.continueToIndex()
      }

      else if (selected === 'Party chat') {
        return this.game.partyChat()
          .then(() => this.continueToIndex())
      }

    })
  }
}
