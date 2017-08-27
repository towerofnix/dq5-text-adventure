'use strict'

const makeItem = require('../../makeItem')

module.exports = makeItem({
  name: 'Pointy hat',
  price: 70,
  type: 'helmet',

  equipable: true,
  equippers: [],

  singular: 'A pointy hat'
})
