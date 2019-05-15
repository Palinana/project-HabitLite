import React from 'react'
import {Link} from 'react-router-dom'

const InfoSection = () => {
  return (
    <div className="info-section">
      <div className="info__container container">
        <div className="info-content__box">
          <h1 className="info-text__heading">
            Stay productive,<br /> wherever you are
          </h1>
          <p>
            Never let location be an issue when accessing your data. HabitLite
            has you covered for all of your habits progress.
          </p>
          <p>
            Securely share your progress with friends, family and colleagues for
            live collaboration and competitions.
          </p>
          <Link to="/" className="info-link__box">
            <div className="info-link__text">See how HabitLite works</div>{' '}
            <span className="info-link__arrow">
              <img
                className="info-sect__arrow"
                src="./images/arrow.svg"
                alt="arrow"
              />
            </span>
          </Link>
        </div>
        <div className="info-img__box">
          <img src="images/illustration-2.svg" alt="People Image" />
        </div>
      </div>
    </div>
  )
}

export default InfoSection
