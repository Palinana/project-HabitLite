import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../components/layout/summary/user-panel'
import UserSingleHabit from '../components/layout/summary/user-singleHabit'

import {fetchUserHabits, postHabit} from '../store/habits'
import {fetchPersonality} from '../store/personality'

class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fade: false
    }
  }

  componentDidMount() {
    const userId = this.props.user.id || this.props.match.params.id
    this.props.getUserPersonality(userId)
    this.props.getUserHabits(userId)
  }

  render() {
    const personality = this.props.personality
    const habits = this.props.habits.map(hab => ({...hab.habit}))

    return (
      <div className="container">
        <UserPanel />

        <div className={this.state.fade ? 'fade-button' : 'row user-summary'}>
          <div className="user-summary_button-box">
            <button
              onClick={() => this.setState({fade: true})}
              className="user-summary_button-summary"
            >
              See summary
            </button>
          </div>
        </div>

        <div
          className={this.state.fade ? 'fade-data' : 'row user-summary-hide'}
        >
          <div
            className={this.state.fade ? 'user-summary__data' : 'fade-button'}
          >
            <h2>Your summary</h2>
            <p>{personality[0] ? personality[0].analysis : null}</p>
            <button onClick={() => this.setState({fade: false})}>Close</button>
          </div>
        </div>

        <div className="row">
          <div className="user-summary__cards-box">
            {habits ? (
              habits.map(habit => (
                <UserSingleHabit habit={habit} key={habit.id} />
              ))
            ) : (
              <div>You don't have any habits</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state ', state)
  return {
    email: state.user.email,
    habits: state.habits,
    user: state.user,
    userId: state.user.id,
    personality: state.personality || ''
  }
}

const mapDispatch = dispatch => {
  return {
    getUserHabits: userId => {
      dispatch(fetchUserHabits(userId))
    },
    postNewHabits: (userId, name) => {
      dispatch(postHabit(userId, name))
    },
    getUserPersonality: userId => {
      dispatch(fetchPersonality(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
