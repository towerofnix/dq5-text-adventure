'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Hardwood headwear',
  price: 120,
  type: 'helmet',

  equipable: true,
  equippers: [],

  singular: 'A piece of hardwood headwear'
})
