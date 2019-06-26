const router = require('express').Router()
const {Goal, UserGoal} = require('../db/models')
module.exports = router

//Get all theCustom goals
router.get('/', (req, res, next) => {
  Goal.findAll()
    .then(goals => res.json(goals))
    .catch(next)
})

// Get allCustom goals by habitId
router.get('/:userId', (req, res, next) => {
  UserGoal.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Goal
      }
    ]
  })
    .then(goals => res.json(goals))
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

// Update checked goal to "checked" or "unchecked"
router.put('/:goalId', async (req, res, next) => {
  await req.user.getGoalsNumber(req.body.habitId)

  UserGoal.findById(req.params.goalId)
    .then(goal => {
      goal.complete = req.body.checked
      goal.save()
      return res.json(goal)
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
              habitId: req.body.habitId
            }
          }
        ]
      }).then(habits => {
        return res.json(habits)
      })
    })
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
          XP: 0,
          HP: 50,
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

router.delete('/:goalId', (req, res, next) => {
  Goal.destroy({
    where: {
      id: req.params.goalId
    }
  })
    .then(() => {
      UserGoal.destroy({
        where: {
          id: req.body.id
        }
      })
    })
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})
