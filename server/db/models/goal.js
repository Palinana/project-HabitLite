const Sequelize = require('sequelize')
const db = require('../db')

const Goal = db.define('goal', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  goalGroup: {
    type: Sequelize.ENUM,
    values: ['Default', 'Custom', 'ChallengeD', 'LoveD', 'StructureD']
  }
})

module.exports = Goal
