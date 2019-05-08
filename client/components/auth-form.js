import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Auth from './auth'
import {Icon} from 'semantic-ui-react'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container">
      <div className="row no-gutter">
        <div className="col-lg-8 d-none d-lg-block">
          <div className="d-flex">
            <div className="p-4 align-self-start">
              <img src="../loginImage.png" className="home-section__image" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 home-section__form">
          <div className="card card-form home-section__card">
            <div className="card-body">
              <h3 className="login-heading text-center">HabitLite</h3>
              <form onSubmit={handleSubmit} name={name}>
                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    required
                    autoFocus
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <div className="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
                <button
                  className="btn btn-lg text-center btn-block text-uppercase mb-2 btn-main"
                  type="submit"
                >
                  {displayName}
                </button>
                {error &&
                  error.response && (
                    <div className="home-section__form-error">
                      {' '}
                      <Icon link name="exclamation circle" />
                      {error.response.data}{' '}
                    </div>
                  )}
                <Auth displayName={displayName} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
