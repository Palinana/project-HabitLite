const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const {levelForXP} = require('./level')
const UserHabit = require('./userHabit')
const Goal = require('./goal')

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
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.prototype.addXP = async function(habitId, by, id) {
  //finds all habits
  let userHabitTableResults = await UserHabit.findAll({
    attributes: ['id', 'progress', 'checkedGoals', 'habitId'],
    raw: true
  })

  //current user habit data
  let userHabitData = userHabitTableResults.find(data => data.id === id)

  //current progress of a user
  let goalsProgress = userHabitData.progress

  //current goals that a user checked so far
  let currentlyCheckedGoals = userHabitData.checkedGoals

  //total number of goals for current habit
  let totalNumberGoals = await this.getGoalsNumber(habitId)
  let newGoalProgress

  if (
    goalsProgress >= 100 ||
    goalsProgress < 0 ||
    currentlyCheckedGoals < 0 ||
    currentlyCheckedGoals > totalNumberGoals
  ) {
    //resetting progress to zero
    await UserHabit.update(
      {
        progress: 0
      },
      {
        where: {
          userId: this.id,
          id
        }
      }
    )
    //resetting checked goals to zero
    await UserHabit.update(
      {
        checkedGoals: 0
      },
      {
        where: {
          userId: this.id,
          id
        }
      }
    )
  }

  //getting updated data from the table
  userHabitTableResults = await UserHabit.findAll({
    attributes: ['id', 'progress', 'checkedGoals', 'habitId'],
    raw: true
  })
  //current user habit data
  userHabitData = userHabitTableResults.find(data => data.id === id)
  //current goals after update
  currentlyCheckedGoals = userHabitData.checkedGoals
  //current progress of a user
  goalsProgress = userHabitData.progress

  if (currentlyCheckedGoals < totalNumberGoals) {
    if (by === 1 && goalsProgress !== 100) {
      //move table update here !!!!
      //updating checkedGoals
      await UserHabit.increment('checkedGoals', {
        where: {
          userId: this.id,
          habitId
        },
        by
      })
    } else if (by === -1 && goalsProgress !== 0) {
      //updating checkedGoals
      await UserHabit.increment('checkedGoals', {
        where: {
          userId: this.id,
          habitId
        },
        by
      })
    }

    //getting updated data from the table after changing checked goals
    userHabitTableResults = await UserHabit.findAll({
      attributes: ['id', 'progress', 'checkedGoals', 'habitId'],
      raw: true
    })
    //current user habit data
    userHabitData = userHabitTableResults.find(data => data.id === id)
    //current goals after update
    currentlyCheckedGoals = userHabitData.checkedGoals

    //calculating the new progress
    newGoalProgress = currentlyCheckedGoals / totalNumberGoals * 100
    console.log('newGoalProgress ', newGoalProgress)

    //updating progress for a habit
    await UserHabit.update(
      {
        progress: newGoalProgress
      },
      {
        where: {
          userId: this.id,
          id
        }
      }
    )
  }

  //updating XP
  await UserHabit.increment('XP', {
    where: {
      userId: this.id,
      habitId
    },
    by
  })

  return newGoalProgress
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

User.afterCreate('updateStats', user => {
  return Object.assign(user, {
    stats: {
      xp: 0,
      hp: 50,
      level: 0
    }
  })
})

User.afterFind('updateStats', async user => {
  return Object.assign(user, {
    stats: {
      xp: !isNaN(await user.getXP()) ? await user.getXP() : 0,
      hp: !isNaN(await user.getHP()) ? await user.getHP() : 50,
      level:
        (await user.getLevel()) <= 0 || (await user.getLevel()) === null
          ? 0
          : await user.getLevel()
    }
  })
})
