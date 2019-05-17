import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../../store'

const Navigation = ({handleClick, isLoggedIn}) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="header__container container">
        <Link to="/" className="navbar-brand small-logo">
          <img src="/images/logo-32.png" alt="Logo Image" />
        </Link>
        <Link to="/" className="navbar-brand logo">
          <img src="/images/logo.png" alt="Logo Image" />
        </Link>
        <div className="header-links">
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/" className="hvrcenter">
                Features
              </Link>
              <Link to="/" className="hvrcenter">
                Team
              </Link>
              <Link to="/login" className="hvrcenter">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navigation)

/**
 * PROP TYPES
 */
Navigation.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
