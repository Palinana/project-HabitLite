import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import IntroSection from './layout/landing/intro-section'
import InfoSection from './layout/landing/info-section'
import Curve from './layout/landing/curve'
import Reviews from './layout/landing/reviews'
import Access from './layout/landing/access'
import FooterSection from './layout/landing/footer-section'

const LandingPage = ({isLoggedIn}) => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <div className="header__container container">
        <img src="./images/logo.png" alt="Logo Image" className="logo" />
        <img
          src="./images/logo-32.png"
          alt="Logo Image"
          className="small-logo"
        />
        <div>
          <Link to="/">Features</Link>
          <Link to="/login">Team</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>

    <IntroSection />
    <Curve />
    <InfoSection />
    <Reviews />
    <Access />
    <FooterSection />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState, null)(LandingPage)

/**
 * PROP TYPES
 */
LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
