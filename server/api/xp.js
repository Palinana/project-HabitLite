const router = require('express').Router()
const User = require('../db/models/user')
module.exports = router

router.put('/', async (req, res, next) => {
  const lastLevel = req.user.level

  await req.user.addXP(+req.body.categoryId, +req.body.incrXP)
  User.find({
    where: {
      id: req.user.id
    }
  })
    .then(user => user.reload())
    .then(user => {
      const currLevel = user.level
      res.json({
        user,
        levelledUp: lastLevel < currLevel
      })
    })
})
