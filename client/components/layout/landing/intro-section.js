import React from 'react'
import {Link} from 'react-router-dom'

const IntroSection = () => (
  <div className="intro-sect__container container">
    <div className="intro-img__box">
      <img src="images/illustration-1.svg" alt="Files Image" />
    </div>
    <div className="intro-content__box">
      <h1 className="intro-text__heading">
        Motivate yourself to achieve your goals.
      </h1>
      <p>
        Trying to eat healthy? Get in shape? Stop smoking? Look no further!
        HabitLite is here to help you establish those habits that will lead to
        your achieving those goals. Customize your habits, earn rewards, and
        track your progress. HabitLite does it all.
      </p>
      <div className="intro-signin__box">
        <button className="intro-signin__button">
          <Link to="/signup">Get Started</Link>
        </button>
      </div>
    </div>
  </div>
)

export default IntroSection
