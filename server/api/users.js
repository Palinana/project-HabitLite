const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    console.log('users ', users)
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user === null) {
        const error = new Error('User not found!')
        error.status = 404
        throw error
      }
      res.status(200).send(user)
    })
    .catch(next)
})
