const Sequelize = require('sequelize')
const db = require('../db')

const UserGoal = db.define('userGoal', {
  XP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  HP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = UserGoal
