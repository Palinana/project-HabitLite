const router = require('express').Router()
const {UserHabit} = require('../db/models')

module.exports = router

router.get('/:userId/:habitId/:id', (req, res, next) => {
  UserHabit.findOne({
    where: {
      userId: req.params.userId,
      habitId: req.params.habitId,
      id: req.params.id
    },
    attributes: ['progress']
  })
    .then(habit => {
      return res.json(habit.dataValues)
    })
    .catch(next)
})
