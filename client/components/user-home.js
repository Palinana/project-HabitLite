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
      fadeSummary: false,
      fadeForm: false,
      name: ''
    }
  }

  componentDidMount() {
    const userId = this.props.user.id || this.props.match.params.id
    this.props.getUserPersonality(userId)
    this.props.getUserHabits(userId)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const name = this.state.name
    const userId = this.props.match.params.id
    this.props.postNewHabit(userId, {name})
    this.setState({name: ''})
  }

  updatedDaysAgo = (year, month, date) => {
    if (month[0] === String(0)) month = month.slice(1)
    if (date[0] === String(0)) date = date.slice(1)

    // sample : Tue Jul 30 2019 00:00:00 GMT-0400 (Eastern Daylight Time)
    let todayDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )

    if (month !== 0) month = month - 1
    let lastUpdateDate = new Date(year, month, date)
    // console.log('lastUpdateDate  - , ', lastUpdateDate)

    let numberOfDays = Math.ceil((todayDate - lastUpdateDate) / 8.64e7) // calculating the difference
    return numberOfDays
  }

  render() {
    const personality = this.props.personality
    const habits = this.props.habits
    const userId = this.props.match.params.id

    return (
      <div className="container user-summary__container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div
            className={
              this.state.fadeSummary && this.state.fadeForm
                ? 'fade-button'
                : 'user-summary'
            }
          >
            <div className="user-summary_button-box">
              <button
                onClick={() => this.setState({fadeSummary: true})}
                // className="user-summary_button-summary"
                className={
                  this.state.fadeSummary
                    ? 'fade-button'
                    : 'user-summary_button-summary'
                }
              >
                See summary
              </button>

              <button
                onClick={() => this.setState({fadeForm: true})}
                className={
                  this.state.fadeForm
                    ? 'fade-button'
                    : 'user-summary_button-habit'
                }
              >
                Add habit
              </button>
            </div>
          </div>

          {/* add form block === */}
          <div className={this.state.fadeForm ? 'fade-data' : 'user-form-hide'}>
            <div
              className={
                this.state.fadeForm ? 'user-form__data' : 'fade-button'
              }
            >
              <div className="user-form__close">
                <Icon
                  name="close"
                  onClick={() => this.setState({fadeForm: false})}
                  className="user-form__close-button"
                />
              </div>

              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div
                  className="form-group user-habit__goal-form"
                  id="add-habit__form"
                >
                  <input
                    type="text"
                    className="form-control user-habit__input"
                    placeholder="Add new daily goal"
                    aria-label="Add new daily goal"
                    aria-describedby="basic-addon2"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-outline-secondary input-group-text"
                    type="submit"
                    id="user-habit__btn"
                  >
                    <Icon name="plus" className="plus-icon" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* user summary block === */}
          <div
            className={
              this.state.fadeSummary ? 'fade-data' : 'user-summary-hide'
            }
          >
            <div
              className={
                this.state.fadeSummary ? 'user-summary__data' : 'fade-button'
              }
            >
              <div className="user-summary__top">
                <h2 className="user-summary__title">Your summary</h2>
                <div className="user-summary__close">
                  <Icon
                    name="close"
                    onClick={() => this.setState({fadeSummary: false})}
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
          {habits.length ? (
            habits.map(habit => (
              <UserSingleHabit
                habit={habit}
                userId={userId}
                key={habit.id}
                date={habit.updatedAt}
                updatedDaysAgo={this.updatedDaysAgo}
              />
            ))
          ) : (
            <div className="user-summary__no-cards">
              You don't have any habits
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('state ', state)
  return {
    email: state.user.email,
    habits: state.habits || '',
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
    postNewHabit: (userId, name) => {
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
