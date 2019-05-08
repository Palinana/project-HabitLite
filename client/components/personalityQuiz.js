import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserHome = props => {
  return (
    <div>
      <h3>Personality</h3>
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
