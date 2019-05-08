'use strict'

const {expect} = chai

describe('User Account', function() {
  describe('Login', function() {
    it('should have a means of inputting username and password')

    it('should have a means of verifying username and password')

    it('should route user to dashboard')
  })

  describe('Profile', function() {
    it('should have user info')

    it('should have habit list')

    it('should have level, points, rewards')
  })

  describe('Logout', function() {
    it('should log out user')

    it('should redirect user to blank login page')
  })
})

describe('Habits', function() {
  describe('Adding habits', function() {
    describe('A user adds a habit', function() {
      it('should accept user input')

      it('should create a habit')

      it('should add said created habit to habit list')
    })
  })

  describe('Completing habits', function() {
    describe('A user checks off a habit', function() {
      it('should change status visually once checked (by colour?)')

      it('should update progress tracker accordingly')

      it('should give user appropriate reward')

      it(
        'should penalize user if NOT checked off by end of day (tbd: loss of points, items, progress, etc. -- by HALF!)'
      )
    })
  })
})

describe('Progress Tracker', function() {
  describe('Displaying progress', function() {
    describe('A user sees their progress', function() {
      it("should display the user's progress in some pleasing fashion")

      it('should reward the user with a major reward upon 100% completion')

      it('should level up the user')

      it('should reset to 0% upon completion')

      it(
        'should reset to last level at 50% if user gets to 0% at their current level'
      )
    })
  })
})
