const router = require('express').Router()
const {Category, UserCategory} = require('../db/models')
module.exports = router

router.post('/:userId', (req, res, next) => {
  Category.create({name: req.body.name})
    .then(category =>
      UserCategory.create(
        {
          categoryId: Number(category.id),
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
    .then(newUserCategory => {
      const {categoryId} = newUserCategory
      return UserCategory.findOne({
        where: {
          userId: req.body.userId,
          categoryId
        },
        include: [
          {
            model: Category
          }
        ]
      })
    })
    .then(indivhabit => res.status(201).json(indivhabit))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.send(categories))
    .catch(next)
})

router.get('/:userId', (req, res, next) => {
  UserCategory.findAll({
    where: {
      userId: req.params.userId
    },
    include: [
      {
        model: Category
      }
    ]
  })
    .then(categories => res.send(categories))
    .catch(next)
})
