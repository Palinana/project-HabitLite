const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Habit = db.model('habit')
const UserHabit = db.model('userHabit')

const testHabit = {
  name: 'test_name_habit'
}

describe('Habit model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/habits/:userId', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'cod@gmail.com',
        password: 'bones'
      })

      await Habit.create({
        name: testHabit.name
      }).then(habit =>
        UserHabit.create({
          habitId: Number(habit.id),
          userId: 1,
          XP: 0,
          HP: 10
        })
      )
    })

    it('GET /api/habits/:userId', () => {
      return request(app)
        .get('/api/habits/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].habit.name).to.be.equal(testHabit.name)
        })
    })
  }) // end describe('correctPassword')
}) // end describe('User model')
