import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../summary/user-panel'
import GoalProgress from '../../ui/goal-progress'
import {Icon} from 'semantic-ui-react'

import {fetchUserGoals, postGoal, updateGoal, updateUser} from '../../../store'

class UserHabit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
      goal: {},
      goalGroup: 'Custom',
      description: '',
      complete: false
    }
  }

  componentDidMount() {
    const userId = this.props.location.state.userId
    const habitId = this.props.location.state.habit.habitId
    this.props.getUserGoals(userId, habitId)
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const goal = {
      goalGroup: 'Custom',
      description: this.state.description,
      complete: false
    }
    const userId = this.props.location.state.userId || ''
    const habitId = this.props.location.state.habit.habitId || ''
    this.props.postNewGoal(userId, habitId, goal)
    this.setState({goal: {}})
    this.handleClear(event)
  }

  handleClear = event => {
    event.preventDefault()
    this.setState({
      isClicked: false,
      habit: {},
      description: '',
      complete: false
    })
  }

  render() {
    const habit = this.props.location.state.habit
    // const userId = this.props.location.state.userId
    const {goals} = this.props

    let completedGoals = goals.filter(goal => goal.complete === true)
    let incompletedGoals = goals.filter(goal => goal.complete === false)
    // console.log('completedGoals ', completedGoals)
    // console.log('incompletedGoals ', incompletedGoals)

    return (
      <div className="container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div className="user-habit__box">
            <div className="user-habit__progress">
              <div>{habit.habit.name}</div>
              <GoalProgress habit={habit} />
            </div>

            <div className="user-habit__goals">
              <div className="user-habit__goals-box">
                <h5 className="user-habit__goals-title">Your daily goals</h5>
                <form className="form-inline mb-5" onSubmit={this.handleSubmit}>
                  <div className="form-group user-habit__goal-form">
                    <input
                      type="text"
                      className="form-control user-habit__input"
                      placeholder="Add new daily goal"
                      aria-label="Add new daily goal"
                      aria-describedby="basic-addon2"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
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

                <div className="user-goals__incompleted">
                  <h5 className="user-goals__incompleted-title">
                    Incompleted:{' '}
                  </h5>
                  {incompletedGoals.length ? (
                    incompletedGoals.map(goal => (
                      <div className="checkbox" key={goal.goal.id}>
                        <label>
                          <input
                            type="checkbox"
                            onClick={this.props.update.bind(
                              this,
                              goal,
                              this.props.userId,
                              habit.id,
                              habit.XP
                            )}
                          />
                          <span className="cr">
                            <Icon name="check" className="cr-icon" />
                          </span>
                          {goal.goal.description}
                        </label>
                      </div>
                    ))
                  ) : (
                    <h5 className="user-goals__empty">Nothing to complete</h5>
                  )}
                </div>
              </div>

              <div className="user-habit__goals-box mt-5">
                <div className="user-goals__completed">
                  <h5 className="user-goals__completed-title">Completed: </h5>
                  {completedGoals.length ? (
                    completedGoals.map(goal => (
                      <div className="checkbox" key={goal.goal.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={goal.complete}
                            onClick={this.props.update.bind(
                              this,
                              goal,
                              this.props.userId,
                              habit.id,
                              habit.XP
                            )}
                          />
                          <span className="cr">
                            <Icon name="check" className="cr-icon" />
                          </span>
                          {goal.goal.description}
                        </label>
                      </div>
                    ))
                  ) : (
                    <h5 className="user-goals__empty">
                      You haven't completed daily goals yet
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  // console.log('state => ', state)
  return {
    goals: state.goals
  }
}

const mapDispatch = dispatch => {
  return {
    getUserGoals: (userId, habitId) => {
      dispatch(fetchUserGoals(userId, habitId))
    },
    postNewGoal: (userId, habitId, goal) => {
      dispatch(postGoal(userId, habitId, goal))
    },
    update(userGoal, userId, habitId, incrXP, evt) {
      if (!evt.target.checked) incrXP = -1
      else incrXP = +1
      dispatch(updateUser(userGoal.goal.habitId, incrXP))
      dispatch(
        updateGoal(
          userGoal.userId,
          userGoal.goal.habitId,
          userGoal.id,
          evt.target.checked
        )
      )
    }
  }
}

export default connect(mapState, mapDispatch)(UserHabit)

UserHabit.propTypes = {
  user: PropTypes.object
}
