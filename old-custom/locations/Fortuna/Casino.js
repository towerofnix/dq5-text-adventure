'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasino extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino',
      characters: {
        bunnyWelcome: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to the Fortuna casino! I've gotta tell ya before ya
              start, we only accept tokens in here. You can buy tokens from
              the cashier over there.
            `)
          }
        }),

        casinoVender: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to the casino token vending area.
            `)

            this.say(`
              You currently have ${this.game.casinoTokens} tokens,
              ${this.game.players.hero.name}.
            `)

            this.say(`
              Each casino token costs twenty gold coins. How many would you
              like to purchase?
            `)

            // TODO: Casino tokens
            this.say(`
              Oh, casino purchases haven't been implemented yet? That's too
              bad...
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
          Dad! Dad! Let's go to the slurpdorome and watch a slime race! I
          reckon I can pick a winner!
        `)
      },

      () => {
        this.game.players.sancho.say(`
          Maybe we can ween esomething for our journey. Esomething which ees
          gonna muchos help us.
        `)

        this.game.players.sancho.say(`
          But you no gamble too much, okay, friend? The first rule of the
          casino ees to take eet eslow.
        `)
      }
    ]

    this.game.partyChatInit(scene)
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The casino of Fortuna is huge! There's things all around to see and do.
      At the end of the room, a play appears to be going on. A bunny girl is
      standing by the entrance, ready to greet you.
    `)

    return this.game.prompt(
      'Exit the casino',
      'Talk to the bunny girl',
      'Talk to the casino vender',
      'Check out the play',
      'See what\'s at the western side of the casino',
      'See what\'s at the eastern side of the casino',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Exit the casino')
        return this.game.goTo('Fortuna')

      else if (selected === 'Talk to the bunny girl')
        return this.game.talkTo(this.characters.bunnyWelcome)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the casino vender')
        return this.game.talkTo(this.characters.casinoVender)
          .then(() => this.continueToIndex())

      else if (selected === 'Check out the play')
        return this.game.goTo('Fortuna/Casino Play')

      else if (
        selected === 'See what\'s at the western side of the casino'
      )
        return this.game.goTo('Fortuna/Casino Western')

      else if (
        selected === 'See what\'s at the eastern side of the casino'
      )
        return this.game.goTo('Fortuna/Casino Eastern')
          .then(() => this.game.goTo(this))

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
