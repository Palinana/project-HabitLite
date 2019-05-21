const User = require('./user')
const Goal = require('./goal')
const Habit = require('./habit')
const UserHabit = require('./userHabit')
const Personality = require('./personality')
const UserGoal = require('./userGoal')

Habit.hasMany(Goal)
Goal.belongsTo(Habit)
UserHabit.belongsTo(User)
UserHabit.belongsTo(Habit)
User.hasMany(UserHabit)
Habit.hasMany(UserHabit)
UserGoal.belongsTo(User)
UserGoal.belongsTo(Goal)
User.hasMany(UserGoal)
Goal.hasMany(UserGoal)
Personality.belongsTo(User)
User.hasOne(Personality)

module.exports = {
  User,
  Habit,
  Goal,
  UserHabit,
  Personality,
  UserGoal
}
