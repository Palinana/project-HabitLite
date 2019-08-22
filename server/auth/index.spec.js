const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Auth routes', () => {
  //empty the table after each spec
  after(function() {
    return Promise.all([User.truncate({cascade: true})])
  })

  //creates a new user
  describe('POST /signup', () => {
    it('creates a new user', () => {
      return request(app)
        .post('/auth/signup')
        .send({
          email: 'cody@test.com',
          password: 'test'
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.equal('cody@test.com')
        })
    })
  }) // end describe('POST /signup')

  describe('POST /login', () => {
    it('login as existing user', () => {
      return request(app)
        .post('/auth/login')
        .send({
          email: 'cody@test.com',
          password: 'test'
        })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.equal('cody@test.com')
        })
    })
  }) // end describe('POST /login')
}) // end describe('Auth routes')
