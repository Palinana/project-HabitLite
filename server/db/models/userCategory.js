const Sequelize = require('sequelize')
const db = require('../db')

const UserCategory = db.define('userCategory', {
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
  }
})

module.exports = UserCategory
