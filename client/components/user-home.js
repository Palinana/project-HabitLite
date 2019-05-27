import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'

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
    const habits = this.props.habits
    const userId = this.props.match.params.id

    return (
      <div className="container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div className={this.state.fade ? 'fade-button' : 'user-summary'}>
            <div className="user-summary_button-box">
              <button
                onClick={() => this.setState({fade: true})}
                className="user-summary_button-summary"
              >
                See summary
              </button>
            </div>
          </div>

          <div className={this.state.fade ? 'fade-data' : 'user-summary-hide'}>
            <div
              className={this.state.fade ? 'user-summary__data' : 'fade-button'}
            >
              <div className="user-summary__top">
                <h2 className="user-summary__title">Your summary</h2>
                <div className="user-summary__close">
                  <Icon
                    name="close"
                    onClick={() => this.setState({fade: false})}
                    className="user-summary__close-button"
                  />
                </div>
              </div>
              <p className="user-summary__analysis">
                {personality[0] ? personality[0].analysis : null}
              </p>
            </div>
          </div>
        </div>

        <div className="user-summary__cards-box">
          {habits ? (
            habits.map(habit => (
              <UserSingleHabit habit={habit} userId={userId} key={habit.id} />
            ))
          ) : (
            <div>You don't have any habits</div>
          )}
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
