const router = require('express').Router()
const {Goal, UserGoal} = require('../db/models')
module.exports = router

//Get all theCustom goals
router.get('/', (req, res, next) => {
  Goal.findAll()
    .then(goals => res.json(goals))
    .catch(next)
})

// Update checked goal to "checked" or "unchecked"
router.put('/:goalId', (req, res, next) => {
  UserGoal.findById(req.params.goalId)
    .then(goal => {
      goal.complete = req.body.checked
      return goal.save()
    })
    .then(() => {
      UserGoal.findAll({
        where: {
          userId: req.body.userId
        },
        include: [
          {
            model: Goal,
            where: {
              categoryId: req.body.habitId
            }
          }
        ]
      }).then(habits => res.json(habits))
    })
    .catch(next)
})

// Get allCustom goals by habitId
router.get('/:userId/:habitId', (req, res, next) => {
  UserGoal.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Goal,
        where: {
          habitId: req.params.habitId
        }
      }
    ]
  })
    .then(goals => res.json(goals))
    .catch(next)
})

router.post('/:userId/:habitId', (req, res, next) => {
  Goal.create({
    habitId: Number(req.params.habitId),
    description: req.body.description,
    goalGroup: req.body.goalGroup
  })
    .then(goal =>
      UserGoal.create(
        {
          goalId: Number(goal.id),
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
    .then(newUserGoal => {
      const {goalId} = newUserGoal
      return UserGoal.findOne({
        where: {
          userId: req.params.userId,
          goalId
        },
        include: [
          {
            model: Goal,
            where: {
              habitId: req.params.habitId
            }
          }
        ]
      })
    })
    .then(indivgoal => res.status(201).json(indivgoal))
    .catch(next)
})
