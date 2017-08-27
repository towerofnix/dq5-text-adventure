'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoWestern extends Location {
  constructor() {
    super({
      name: 'Fortuna - Western Casino',
      characters: {
        guard: new (class extends Character {
          talkedTo() {
            this.say(`
              They never give you gold back, no matter how many tokens you
              win. The best way to enjoy the fun's to buy tokens with any
              leftover gold you have, but not to break the bank.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.sancho.say(`
                  Ees a good idea, no? Eef the casino, eet no return to the
                  clientes their gold, they gonna make beeg money! Maybe ees
                  time for a casino een Gotha, no? But ees no good for the
                  esafety. The crime, ees gonna increase too. Hmm...
                `)
              }
            ])
          }
        }),

        arenaSpectator: new (class extends Character {
          talkedTo() {
            this.say(`
              Listen to this!
            `)

            this.say(`
              See that monster? It's such a long shot, they're offering odds
              of forty to one! Can you believe it!?
            `)

            this.say(`
              GO ON! THAT'S THE WAY!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  He was a bit carried away, for a grown up.
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  You no talk too much, okay, friend? Eef you play here, you
                  play. But eef you go, you must go quickly.
                `)
              }
            ])
          }
        }),

        arenaMaster: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to the Monster Arena, where monsters from all over the
              world gather together to pit their skills against each other!
            `)

            this.say(`
              Can you predict who'll win? Put your money where your mouth is,
              and you could be in for some monstrously big winnings!
            `)

            // TODO: Monster arena
            this.say(`
              Well, you know. If you have imagination. This hasn't quite been
              opened to the general public yet!
            `)
          }
        })
      }
    })

    const loc = this
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The western side of the casino has clearly been mostly replaced with an
      arena dedicated to monsters fighting with each other. Two flights of
      stairs head down into the basement - who knows what wonderful games
      might be waiting down there?
    `)

    this.game.logParagraph(`
      A guard is pacing around near the arena. He seems to be keeping an eye
      on everything going around the casino. Another man is watching the
      monster arena quite intensely.
    `)

    return this.game.prompt(
      'Head back to the casino main',
      'Head down the first stairs',
      'Head down the second stairs',
      'Take a look at the arena',
      'Talk to the guard',
      'Talk to the arena spectator',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back to the casino main')
        return this.game.goTo('Fortuna/Casino')

      else if (selected === 'Head down the first stairs')
        return this.game.goTo('Fortuna/Slurpodrome')

      else if (selected === 'Head down the second stairs')
        return this.game.goTo('Fortuna/Casino TnT')

      else if (selected === 'Take a look at the arena') {
        return this.game.talkTo(this.characters.arenaMaster)
          .then(() => this.continueToIndex())
      }

      else if (selected === 'Talk to the guard') {
        return this.game.talkTo(this.characters.guard)
          .then(() => this.continueToIndex())
      }

      else if (selected === 'Talk to the arena spectator') {
        return this.game.talkTo(this.characters.arenaSpectator)
          .then(() => this.continueToIndex())
      }

      else if (selected === 'Party chat') {
        return this.game.partyChat()
          .then(() => this.continueToIndex())
      }

    })
  }
}
