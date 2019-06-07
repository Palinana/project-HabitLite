const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const {levelForXP, LEVELS} = require('./level')
const UserHabit = require('./userHabit')
const Goal = require('./goal')
const UserGoal = require('./userGoal')

const stat = name => ({
  type: Sequelize.VIRTUAL,
  get() {
    return this.stats[name]
  }
})

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  avatar: {
    type: Sequelize.STRING,
    defaultValue:
      'https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg'
  },
  progress: stat('progress'),
  level: stat('level'),
  xp: stat('xp'),
  hp: stat('hp'),
  lives: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 3,
    validate: {
      min: 0
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.addXP = async function(habitId, by) {
  await UserHabit.increment('XP', {
    where: {
      userId: this.id,
      habitId
    },
    by
  })
}

User.prototype.getXP = function() {
  return UserHabit.sum('XP', {
    where: {
      userId: this.id
    }
  })
}

User.prototype.getHP = function() {
  return UserHabit.sum('HP', {
    where: {
      userId: this.id
    }
  })
}

User.prototype.getGoalsNumber = function(habitId) {
  return Goal.count({
    where: {
      habitId: habitId
    }
  })
}

User.prototype.getLevel = async function() {
  return levelForXP(await this.getXP())
}

User.prototype.getProgress = async function() {
  const currXP = await this.getXP()
  const level = levelForXP(currXP)
  const {maxXP} = LEVELS[level]
  const {maxXP: lastMaxXP} = LEVELS[level - 1] || {maxXP: 0}
  console.log('lastMaxXP ', lastMaxXP)
  console.log('currXP ', currXP)
  console.log('maxXP ', maxXP)
  return (currXP - lastMaxXP) / (maxXP - lastMaxXP) * 100
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.afterFind('updateStats', async user =>
  Object.assign(user, {
    stats: {
      progress: await user.getProgress(),
      level: await user.getLevel(),
      xp: await user.getXP(),
      hp: await user.getHP()
    }
  })
)
