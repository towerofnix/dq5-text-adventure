'use strict'

const Location = require('../../../Location')
const Character = require('../../../Character')

module.exports = class FortunaMonstergarten extends Location {
  constructor() {
    super({
      name: 'Fortuna - Monstergarten',
      characters: {
        monty: new (require('../../characters/npc/Monty')),
        carla: new (class extends Character {
          constructor() {
            super({
              name: 'Carla'
            })
          }

          talkedTo() {
            this.say(`
              Hi! I'm, like, Monty's assistant, Carla. There are these, like,
              totally weird monsters and they're, like, near the Neverglade
              and in the Realm of the Faeries and stuff.
            `)

            this.game.removePartyChatScene(loc.talkScene)
            this.game.partyChatInit(loc.talkScene = [
              () => {
                this.game.players.madchen.say(`
                  Now I really want to visit the Realm of the Faeries!
                `)
              },

              () => {
                this.game.players.sancho.say(`
                  Weird monsters? You can't wait to go and esee, eh, friend?
                  You are buzzing like a mosquito!
                `)
              },

              () => {
                this.game.players.parry.say(`
                  The assistant certainly has some good tips!
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
          It looks like Monty the monster monitor has a place here too.
        `)
      },

      () => {
        this.game.players.madchen.say(`
          Ohh! Look at all the monsters in those cages! Do you think the old
          man keeps his monsters here too?
        `)
      }
    ])
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      The monstergarten in Fortuna comprises of a small cave fit for a person
      or two, connected to a tunnel leading to all sorts of cages designed
      for different types of monsters.
    `)

    this.game.logParagraph(`
      An old man - probably the manager of this place - is sitting at a
      table. There's a spare chair for you to take a seat in and say hello.
    `)

    this.game.logParagraph(`
      A young lady is standing by one side of the cave.
    `)

    return this.game.prompt(
      'Leave the monstergarten',
      'Talk to the old man',
      'Talk to the young lady',
      'Party chat'
    ).then(([ selection ]) => {

      if (selection === 'Leave the monstergarten')
        return this.game.goTo('Fortuna/Western')

      if (selection === 'Talk to the old man')
        return this.game.talkTo(this.characters.monty)
          .then(() => this.continueToIndex())

      else if (selection === 'Talk to the young lady')
        return this.game.talkTo(this.characters.carla)
          .then(() => this.continueToIndex())

      else if (selection === 'Party chat')
        return this.game.partyChat()
          .then(() => this.continueToIndex())

    })
  }
}
