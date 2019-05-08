const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  habitGroup: {
    type: Sequelize.ENUM,
    values: ['Default', 'Custom', 'ChallengeD', 'LoveD', 'StructureD']
  }
})

module.exports = Habit
