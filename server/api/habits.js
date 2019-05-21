const router = require('express').Router()
const {Habit, UserHabit} = require('../db/models')
module.exports = router

router.get('/:userId', (req, res, next) => {
  UserHabit.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Habit
      }
    ]
  })
    .then(habits => res.send(habits))
    .catch(next)
})

router.post('/:userId', (req, res, next) => {
  Habit.create({name: req.body.name})
    .then(habit =>
      UserHabit.create(
        {
          habitId: Number(habit.id),
          userId: req.body.userId,
          XP: 5,
          HP: 100
        },
        {
          include: [
            {
              all: true
            }
          ]
        }
      )
    )
    .then(newUserHabit => {
      const {habitId} = newUserHabit
      return UserHabit.findOne({
        where: {
          userId: req.body.userId,
          habitId
        },
        include: [
          {
            model: Habit
          }
        ]
      })
    })
    .then(indivhabit => res.status(201).json(indivhabit))
    .catch(next)
})
