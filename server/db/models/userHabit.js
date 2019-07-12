const Sequelize = require('sequelize')
const db = require('../db')

const UserHabit = db.define('userHabit', {
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
  progress: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0,
      max: 100
    }
  },
  checkedGoals: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0
    }
  }
})

module.exports = UserHabit
