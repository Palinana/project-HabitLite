import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Auth = ({displayName}) => (
  <div className="home-section__auth-wrapper">
    {displayName === 'Login' ? (
      <div className="home-section__auth-box justify-content-center">
        Not registered?<Link to="/signup" className="small home-section__auth">
          Create an account
        </Link>
      </div>
    ) : (
      <div className="home-section__auth-box justify-content-center">
        Have an account?<Link to="/login" className="small home-section__auth">
          Login
        </Link>
      </div>
    )}
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(Auth)
