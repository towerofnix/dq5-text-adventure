'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaCasinoPlay extends Location {
  constructor() {
    super({
      name: 'Fortuna - Casino Play',
      characters: {
        cheeringFather: new (class extends Character {
          talkedTo() {
            this.say(`
              Good evening, ladies and gentlemen! Tonight is the palace ball!
              Where's the stunning young beauty came to steal a prince's
              heart? What? She's behind me? Oh, no she isn't!
            `)
          }
        }),

        watcherMan: new (class extends Character {
          talkedTo() {
            this.say(`
              These performers aren't bad.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  Yes, I wish we had a bit longer to watch the show.
                `)
              }
            ])
          }
        }),

        cindy: new (class extends Character {
          constructor() {
            super({
              name: 'Cindy'
            })
          }

          talkedTo() {
            this.say(`
              Hi, friends! I'm Cindy! I'm just a plain little girl. My
              stepmother's so kind, she lets me stay in the house. She's
              wicked.
            `)

            this.say(`
              I feel so nervous. My heart is pounding in my chest. Tonight is
              the night of the ball! And I'm actually going!
            `)

            this.say(`
              Please, faerie godmother! Please don't spoil my dreams!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  I know this story! Have you heard it before too, Dad?
                `)
              }
            ])
          }
        }),

        heidious: new (class extends Character {
          constructor() {
            super({
              name: 'Heidious'
            })
          }

          talkedTo() {
            this.say(`
              Hello everyone! I'm Heidious! I'm so beautiful, everyone turns
              to look at me. Just look at my stunning dress. It fits me so
              well, it hurts!
            `)

            this.say(`
              Poor Cindy. Is she beautiful? Oh, no she isn't!  Is her dress
              stunning? Say it together with me now everyone... Oh, no it's
              not!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Is that girl being bullied? I know it's just a story, but I
                  still feel sorry for her.
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  You know, when I theenk about it now, ees no eso often that
                  Madchen, eshe has a chance to wear a pretty dress, no?
                `)
              },

              () => {
                this.game.players.madchen.say(`
                  What a pretty dress! I hope I get to wear a dress like that
                  one day.
                `)
              },

              () => {
                this.game.players.madchen.say(`
                  I always get really upset when I read this kind of story.
                `)

                this.game.players.madchen.say(`
                  I mean, the girls who become princesses are only ever the
                  pretty ones.
                `)
              },
            ])
          }
        }),

        stepmother: new (class extends Character {
          constructor() {
            super({
              name: 'Wicked Stepmother'
            })
          }

          talkedTo() {
            this.say(`
              Have you seen my two daughters? They couldn't be more
              different. One is Heidious... (Why are you laughing?)
            `)

            this.say(`
              The other is Cindy, that shabby little witch my husband brought
              into the family.
            `)

            this.say(`
              But tonight is the night of the ball! My Heidious will woo the
              handsome young prince!
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.parry.say(`
                  Yikes! She's got a bit of a loud voice on her!
                `)
              }
            ])
          }
        })
      }
    })

    const loc = this
  }

  goneTo() {
    this.game.partyChatInit([
      () => {
        this.game.players.parry.say(`
          Oh no! Do all princes have to go to balls? I hate dancing!
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      This looks to be quite the ball! A young, plain girl is standing at
      the front of the play. A particularly pretty girl is standing nearby a
      slightly anxious older lady.
    `)

    this.game.logParagraph(`
      Farther back, overviewing the ball, are two young men beside someone
      who looks to be their father. He's cheering over the show:
    `)

    this.game.talkTo(this.characters.cheeringFather)

    this.game.logParagraph(`
      At the very back of the play, you can see a hallway hidden by a curtain
      into another room..
    `)

    this.game.logParagraph(`
      A man is watching the show, alone.
    `)

    return this.game.prompt(
      'Head back to the casino main',
      'Go through the curtain',
      'Talk to the man who\'s watching',
      'Talk to the plain girl',
      'Talk to the pretty girl',
      'Party chat'
    ).then(([ selected ]) => {

      if (selected === 'Head back to the casino main')
        return this.game.goTo('Fortuna/Casino')

      else if (selected === 'Talk to the man who\'s watching')
        return this.game.talkTo(this.characters.watcherMan)
          .then(() => this.continueToIndex())

      else if (selected === 'Go through the curtain')
        return this.game.goTo('Fortuna/Casino Dressing Room')

      else if (selected === 'Talk to the plain girl')
        return this.game.talkTo(this.characters.cindy)
          .then(() => this.continueToIndex())

      else if (selected === 'Talk to the pretty girl')
        return this.game.talkTo(this.characters.heidious)
          .then(() => this.continueToIndex())

      else if (selected === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
