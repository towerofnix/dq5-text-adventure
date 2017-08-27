'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class Coburg extends Location {
  constructor() {
    super({
      name: 'Coburg',
      characters: {
        girl: new (class extends Character {
          talkedTo() {
            this.say(`
              Welcome to Coburg.
            `)

            this.game.partyChatInit([
              () => {
                this.game.players.sancho.say(`
                  You feel only the nostalgia for Coburg, si, friend? But for
                  your Uncle Sancho ees, ees..
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  I know ees loco, but for me, being een Coburg ees eso hard.
                  My heart, ees breaking, you know?
                `)
              },

              () => {
                this.game.players.parry.say(`
                  I like this place. You like it too, right, Dad?
                `)
              }
            ])
          }
        }),

        man: new (class extends Character {
          talkedTo() {
            this.say(`
              You've probably heard all about me. I'm the one who helped Prince
              Harry oust that fake dowager.
            `)

            this.say(`
              ..What!? The one who did it was actually the Prince of Gotha?
            `)

            this.say(`
              He went missing at just about the time he was crowned, didn't he?
              We had soldiers here from Gotha on a search party looking for
              him, see. Come to think of it, you look quite a lot like the
              fellow in question.
            `)
          }
        })
      }
    })
  }

  goneTo() {
    const scene = [
      () => {
        this.game.players.madchen.say(`
          It's a really big castle, isn't it? You'd think they'd let the
          townspeople live inside like we do in Gotha.
        `)
      },

      () => {
        this.game.players.madchen.say(`
          Um, Sancho always says he doesn't much fancy the idea of visiting
          Coburg. This is the one castle we didn't visit when we were
          travelling around with him.
        `)
      },

      () => {
        this.game.players.parry.say(`
          I know about Coburg! Coburg and Gotha have always been good friends,
          haven't they?
        `)
      }
    ]

    this.game.partyChatInit(scene)
  }

  index() {
    this.game.clearConsole()

    // TODO: The word "shops" here isn't really nice.
    this.game.logParagraph(`
      The castle town of Coburg looks just as you remember it: a street
      consisting of various helpful shops and a large moat-surrounded castle.
    `)

    this.game.logParagraph(`
      Lined along the street are an inn, an armour shop, an item shop, and the
      dropped-down bridge across the moat.
    `)

    this.game.logParagraph(`
      Skipping around a nearby patch of ground is a young girl. Near the castle
      moat bridge an old man stands, across from a large sign.
    `)

    return this.game.prompt(
      'Leave the town',
      'Go into the inn',
      'Go into the armour shop',
      'Go into the item shop',
      'Cross the bridge and enter the castle',
      'Talk to the young girl',
      'Talk to the old man',
      'Read the sign',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Leave the town') {
        this.game.logParagraph(`
          But that's not quite possible yet! Instead try pressing control-C
          twice in a row to exit.
        `)

        return this.continueToIndex()
      }

      else if (selected === 'Go into the inn')
        return this.game.goTo('Coburg/Inn')

      else if (selected === 'Go into the armour shop')
        return this.game.goTo('Coburg/Armour Shop')

      else if (selected === 'Go into the item shop')
        return this.game.goTo('Coburg/Item Shop')

      else if (selected === 'Cross the bridge and enter the castle')
        return this.game.goTo('Coburg/Castle Entrance')

      else if (selected === 'Talk to the young girl')
        return this.game.talkTo(this.characters.girl)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the old man')
        return this.game.talkTo(this.characters.man)
          .then(() => this.continueToIndex())

      else if (selected === 'Read the sign') {
        this.game.logParagraph(`
          'Glory to the Kingdom of Coburg! Everything is for the people!'
        `)

        return this.continueToIndex()
      }

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
