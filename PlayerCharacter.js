'use strict'

const Character = require('./Character')

module.exports = class PlayerCharacter extends Character {
  constructor(opts) {
    super(opts)

    this.items = {}
  }

  save() {
    const items = {}
    for (let itemName in this.items) {
      items[itemName] = this.items[itemName].count
    }

    return {items}
  }

  load(loadObj) {
    this.itemes = {}
    for (let itemName in loadObj.items || {}) {
      this.items[itemName] = {
        count: loadObj.items[itemName],
        item: this.game.getItem(itemName)
      }
    }
  }

  getItem(item) {
    if (item.name in this.items) {
      this.items[item.name].count += 1
    } else {
      this.items[item.name] = {count: 1, item}
    }
  }
}
