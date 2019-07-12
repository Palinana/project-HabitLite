import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found-sect__container container">
      <div className="not-found-content__box">
        <h1 className="not-found-text__heading">404</h1>
        <p>Oh snap! The page you are looking for doesn't exist!</p>
        <div className="intro-signin__box">
          <button className="intro-signin__button">
            <Link to="/">Go Home</Link>
          </button>
        </div>
      </div>

      <div className="not-found-img__box">
        <img src="/images/illustration-4.svg" alt="Files Image" />
      </div>
    </div>
  )
}

export default NotFound
