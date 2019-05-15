import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="header__container container">
        <Link to="/" class="navbar-brand small-logo">
          <img src="./images/logo-32.png" alt="Logo Image" />
        </Link>
        <Link to="/" class="navbar-brand logo">
          <img src="./images/logo.png" alt="Logo Image" />
        </Link>
        <div className="header-links">
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
      </div>
    </nav>
  )
}

export default Navigation
