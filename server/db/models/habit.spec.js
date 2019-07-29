var chai = require('chai')
var expect = chai.expect
const db = require('../index')
const Habit = db.model('habit')

describe('Habit model', function() {
  beforeEach(function() {
    return db.sync({force: true})
  })

  describe('name field', function() {
    it('habit has been created', async () => {
      const firstHabit = await Habit.create({name: 'this is a test'})
      expect(firstHabit.name).to.be.equal('this is a test')
    })
  })
})
