'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Bronze shield',
  price: 370,
  type: 'shield',

  equipable: true,
  equippers: [],

  singular: 'A bronze shield'
})
