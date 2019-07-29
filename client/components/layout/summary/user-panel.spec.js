import React from 'react'
import {expect} from 'chai'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import UserPanel from './user-panel'

const middlewares = []
const mockStore = configureStore(middlewares)

Enzyme.configure({adapter: new Adapter()})

describe('<UserPanel />', function() {
  let UserWrapper

  const initalState = {
    user: {
      avatar: 'doggy img',
      email: 'test_user@gmail.com',
      level: 5,
      lives: 3
    }
  }
  const {avatar, email, level, lives} = initalState.user

  const store = mockStore(initalState)

  beforeEach('Create UserWrapper', function() {
    UserWrapper = shallow(<UserPanel store={store} />)
  })

  describe('props', function() {
    it("should receive the user's avatar as props", function() {
      expect(UserWrapper.props()).to.have.property('avatar', avatar)
    })

    it("should receive the user's email as props", function() {
      expect(UserWrapper.props()).to.have.property('email', email)
    })

    it("should receive the user's level as props", function() {
      expect(UserWrapper.props()).to.have.property('level', level)
    })

    it("should receive the user's lives as props", function() {
      expect(UserWrapper.props()).to.have.property('lives', lives)
    })
  }) // end describe('props')
}) // end describe(<User /> Component)
