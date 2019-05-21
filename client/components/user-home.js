import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../components/layout/summary/user-panel'
import UserSingleHabit from '../components/layout/summary/user-singleHabit'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      habits: ['one', 'two', 'tree', 'tree', 'tree', 'tree', 'tree']
    }
  }

  componentDidMount() {}

  render() {
    const habits = this.state.habits
    return (
      <div className="container">
        <UserPanel />

        <div className="row">
          <div className="user-summary_button-box">
            <button className="user-summary_button-summary">See summary</button>
          </div>
        </div>

        <div className="row">
          <div className="user-summary__cards-box">
            {habits.map(habit => <UserSingleHabit />)}
          </div>
        </div>
      </div>
    )
  }
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
