import React from 'react'
import {Link} from 'react-router-dom'

const Access = () => {
  return (
    <div className="access-sect__box">
      <h2>Get early access today</h2>
      <p>
        It only takes a minute to sign up and our free starter tier is extremely
        generous. If you have any questions, our support team would be happy to
        help you.
      </p>
      <button className="access__button">
        <Link to="/sign-in">Get Started For Free</Link>
      </button>
    </div>
  )
}

export default Access
