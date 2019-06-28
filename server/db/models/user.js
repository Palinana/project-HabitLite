const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const {levelForXP, LEVELS} = require('./level')
const UserHabit = require('./userHabit')
const Goal = require('./goal')
const UserGoal = require('./userGoal')

let goalsProgress = 0
let currentCheckedGoals = 0

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
  //change with every check
  let totalNumberGoals = await this.getGoalsNumber(habitId) //total = 8

  if (currentCheckedGoals < 0) currentCheckedGoals = 0

  if (currentCheckedGoals > totalNumberGoals) {
    currentCheckedGoals = 0
    goalsProgress = 0
  } else if (currentCheckedGoals === totalNumberGoals) {
    goalsProgress = 100
  } else if (currentCheckedGoals < totalNumberGoals) {
    if (by === 1) {
      if (goalsProgress > 100 || goalsProgress === 100) {
        goalsProgress = 100
      } else {
        currentCheckedGoals = +by
      }
    } else if (by === -1) {
      if (goalsProgress < 0 || goalsProgress === 0) {
        goalsProgress = 0
      } else {
        currentCheckedGoals = by
      }
    }
    goalsProgress += currentCheckedGoals / totalNumberGoals * 100
  }

  // console.log('currentCheckedGoals == ', currentCheckedGoals)
  // console.log('goalsProgress == ', goalsProgress)
  await UserHabit.increment('XP', {
    where: {
      userId: this.id,
      habitId
    },
    by
  })
  return goalsProgress
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
  // if(isNaN(await this.getXP())) {
  //   return levelForXP(0)
  // }
  return levelForXP(await this.getXP())
}

User.prototype.getProgress = async function() {
  if (isNaN(await this.getXP())) {
    return [0, goalsProgress]
  }

  const currXP = await this.getXP()
  const level = levelForXP(currXP)
  const maxXP = LEVELS[level]
  const {maxXP: lastMaxXP} = LEVELS[level - 1] || {maxXP: 0}
  // console.log('lastMaxXP ', lastMaxXP)
  // console.log('currXP ', currXP)
  // console.log('maxXP ', maxXP)
  // console.log('goalsProgress ', goalsProgress)

  // return (currXP - lastMaxXP) / (maxXP - lastMaxXP) * 100
  return [(currXP - lastMaxXP) / (maxXP - lastMaxXP) * 100, goalsProgress]
}

// User.prototype.getGoalsProgress = function() {
//   return goalsProgress;
// }

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
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})

User.afterFind('updateStats', async user => {
  console.log('await user.getProgress() ', await user.getProgress())
  return Object.assign(user, {
    stats: {
      progress:
        (await user.getProgress()) !== null ? await user.getProgress() : [0, 0],
      level: (await user.getLevel()) < 0 ? 0 : await user.getLevel(),
      xp: !isNaN(await user.getXP()) ? await user.getXP() : 0,
      hp: !isNaN(await user.getHP()) ? await user.getHP() : 50
    }
  })
})
