'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Rags',
  price: 25,
  type: 'armour',

  equipable: true,
  equippers: [],

  singular: 'A set of rags'
})
