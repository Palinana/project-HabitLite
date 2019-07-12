const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/goals', require('./goals'))
router.use('/habits', require('./habits'))
router.use('/personality', require('./personality'))
router.use('/xp', require('./xp'))
router.use('/progress', require('./progress'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
