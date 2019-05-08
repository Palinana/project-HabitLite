const router = require('express').Router()
const {Habit, UserHabit} = require('../db/models')
module.exports = router

//Get all theCustom habits
router.get('/', (req, res, next) => {
  Habit.findAll()
    .then(habits => res.json(habits))
    .catch(next)
})

// Update checked habit to "checked" or "unchecked"
router.put('/:habitId', (req, res, next) => {
  UserHabit.findById(req.params.habitId)
    .then(habit => {
      habit.complete = req.body.checked
      return habit.save()
    })
    .then(() => {
      UserHabit.findAll({
        where: {
          userId: req.body.userId
        },
        include: [
          {
            model: Habit,
            where: {
              categoryId: req.body.categoryId
            }
          }
        ]
      }).then(habits => res.json(habits))
    })
    .catch(next)
})

// Get allCustom habits by categoryId WORING BY TANIA
router.get('/:userId/:categoryId', (req, res, next) => {
  UserHabit.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Habit,
        where: {
          categoryId: req.params.categoryId
        }
      }
    ]
  })
    .then(habits => res.json(habits))
    .catch(next)
})

router.post('/:userId/:categoryId', (req, res, next) => {
  Habit.create({
    categoryId: Number(req.params.categoryId),
    description: req.body.description,
    habitGroup: req.body.habitGroup
  })
    .then(habit =>
      UserHabit.create(
        {
          habitId: Number(habit.id),
          userId: req.params.userId,
          XP: 10,
          HP: 100,
          complete: req.body.complete
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
          userId: req.params.userId,
          habitId
        },
        include: [
          {
            model: Habit,
            where: {
              categoryId: req.params.categoryId
            }
          }
        ]
      })
    })
    .then(indivhabit => res.status(201).json(indivhabit))
    .catch(next)
})
