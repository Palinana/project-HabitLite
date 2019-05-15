import React from 'react'
import {Link} from 'react-router-dom'

const IntroSection = () => (
  <div className="intro-sect__container container">
    <div className="intro-img__box">
      <img src="images/illustration-1.svg" alt="Files Image" />
    </div>
    <div className="intro-content__box">
      <h1 className="intro-text__heading">
        All your files in one secure location, accessible anywhere.
      </h1>
      <p>
        Fylo stores your most important files in one secure location. Access
        them wherever you need, share and collaborate with friends, family, and
        co-workers.
      </p>
      <div className="intro-signin__box">
        <button className="intro-signin__button">
          <Link to="/sign-in">Get Started</Link>
        </button>
      </div>
    </div>
  </div>
)

export default IntroSection
