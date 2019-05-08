const Sequelize = require('sequelize')
const db = require('../db')

const Personality = db.define('personality', {
  insight: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  habitGroup: {
    type: Sequelize.STRING,
    allowNull: true
  },
  analysis: {
    type: Sequelize.TEXT
  }
})

module.exports = Personality
