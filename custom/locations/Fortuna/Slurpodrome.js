'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaSlurpodrome extends Location {
  constructor() {
    super({
      name: 'Fortuna - Slurpodrome',
      characters: {
        pinkSlime: new (class extends Character {
          talkedTo() {
            this.say(`
              Boing, boing! (slurp)
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  That slime smells of strawberries!
                `)
              }
            ])
          }
        }),

        greenSlime: new (class extends Character {
          talkedTo() {
            this.say(`
              I'm a hopping slurpsation when I goo for it.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  That slime smells of fresh leaves.
                `)
              },

              () => {
                this.game.players.parry.say(`
                  That one certainly seems to look down its nose at the
                  others, doesn't it? Assuming slimes have noses, that is.
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  You wanna bet on the green eslime, My Majesty? Hmm...
                `)
              }
            ])
          }
        }),

        spectator: new (class extends Character {
          talkedTo() {
            this.say(`
              What? These are the results? Unbelievable!
            `)

            this.say(`
              You just can't get a handle on these slimes, no matter how much
              you study their form. They're slippery ones, that's for sure.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  I can't figure it out either. These slimes are all quite
                  unpredictable.
                `)
              },

              () => {
                this.game.players.parry.say(`
                  It's funny when the slimes fall splat on their faces!
                `)
              }
            ])
          }
        }),

        orangeSlime: new (class extends Character {
          talkedTo() {
            this.say(`
              You want me to tell you something good? Err... I know! The
              weather gloopcast! Today might be cloudy...
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  Urgh! That slime smells of curry!
                `)
              }
            ])
          }
        }),

        manager: new (class extends Character {
          talkedTo() {
            // TODO: Slurpodrome
            this.say(`
              Welcome to the slurpodrome! At the moment the race is already
              gooing - perhaps you could ooze on back another more
              slime-prime time?
            `)
          }
        })
      }
    })

    const loc = this
  }

  goneTo() {
    this.game.partyChatInit([
      () => {
        this.game.players.madchen.say(`
          He he! Look at all those funny-coloured slimes!
        `)
      },

      () => {
        this.game.players.sancho.say(`
          The eslimes, they are eso cute, no? Ees because they have the
          healthy paunch, you know. I no theenk of them as monsters.
        `)
      },

      () => {
        this.game.players.parry.say(`
          Yay! It's a slurpodrome! I bet I can pick a winner. Now, let's
          see...
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      It's the slurpodrome! The jelly-packed room contains a tent that oozes
      with curiosities from its unrealistic ability to hold an entire race
      ground.
    `)

    this.game.logParagraph(`
      An old man is peering into the tent - he looks quite shocked with the
      race that must be going on in there. There's a green slime sitting by
      a table, a pink one croozing across the floor in preparation, and an
      orange one beside the tent spinning in circles.
    `)

    return this.game.prompt(
      'Head upstairs',
      'Try your luck in the slurpodrome',
      'Talk to the old man',
      'Talk to the green slime',
      'Talk to the pink slime',
      'Talk to the orange slime',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head upstairs')
        return this.game.goTo('Fortuna/Casino Western')

      else if (selected === 'Try your luck in the slurpodrome')
        return this.game.talkTo(this.characters.manager)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the old man')
        return this.game.talkTo(this.characters.spectator)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the green slime')
        return this.game.talkTo(this.characters.greenSlime)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the pink slime')
        return this.game.talkTo(this.characters.pinkSlime)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the orange slime')
        return this.game.talkTo(this.characters.orangeSlime)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
