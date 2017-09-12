'use strict'

const Location = require('../../Location')

module.exports = class DustyRoom extends Location {
  constructor() {
    super({
      name: 'Dusty Room'
    })
  }

  index() {
    this.game.clearConsole()

    this.game.logParagraph(`
      You look around. You're in a small room; the walls are wooden, and the
      floor is a rough stone. A window in the side of one wall is letting in a
      blindingly significant amount of light, which reveals the rocks and rope
      strewn around the room. The materials litter the floor and nearly cover
      the surface of a short-standing desk.
    `)

    this.game.logParagraph(`
      Lying on the floor in one of the corners of the room is a rolled-up
      scroll.
    `)

    return this.game.prompt(
      'Exit the game',
      'Read the scroll'
    ).then(([ selected ]) => {
      if (selected === 'Exit the game') {
        process.exit(0)
        this.game.logParagraph(`But the exit failed! ^C-^C might work too.`)
        return this.continueToIndex()
      }

      else if (selected === 'Read the scroll') {
        this.game.logParagraph(`
          "You could always build a new one." That was what they were told
          when people learned of the broken glider. The others were right;
          of course they could make another. But nobody said that when the
          second attempt, barely into the sky, was confiscated and set to
          flame by one of the town's guards.
        `)

        this.game.logParagraph(`
          But what had they expected?
        `)

        return this.continueToIndex()
      }
    })
  }
}
