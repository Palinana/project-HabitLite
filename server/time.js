const {UserHabit, Habit, UserCategory} = require('./db/models')
const schedule = require('node-schedule')

/* *** RESETTING ALL HABITS AT MIDNIGHT *** */
schedule.scheduleJob('0 0 * * *', function() {
  UserHabit.findAll({
    include: [Habit]
  }).then(habits => {
    habits.forEach(userHabit => {
      if (userHabit.complete === false) {
        UserCategory.find({
          where: {
            categoryId: userHabit.habit.categoryId,
            userId: userHabit.userId
          }
        }).then(userCategory => {
          userCategory.HP -= 5

          userCategory.save()
        })
      }
      userHabit.complete = false
      userHabit.save()
    })
  })
})
