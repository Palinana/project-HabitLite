import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserPanel from '../components/layout/summary/user-panel'

export const UserHome = props => {
  const {email} = props

  return (
    <div className="container">
      {/* <h3>Welcome, {email}</h3> */}
      <UserPanel />
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
