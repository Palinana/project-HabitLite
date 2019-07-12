import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../summary/user-panel'
import GoalProgress from '../../ui/goal-progress'
import {Icon} from 'semantic-ui-react'

import {
  fetchUserGoals,
  postGoal,
  updateGoal,
  resetGoals,
  updateUser,
  deleteGoal,
  fetchUserProgress
} from '../../../store'

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
    const id = this.props.location.state.habit.id

    this.props.getUserProgress(userId, habitId, id)
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

  resetAllGoals = (userId, habitId, goals) => {
    for (let i = 0; i < goals.length; i++) {
      this.props.reset(userId, habitId, goals[i].id)
    }
  }

  render() {
    const habit = this.props.location.state.habit
    const {goals} = this.props
    const progress = this.props.progress
    //created a copy of progress
    const goalProgress = JSON.parse(JSON.stringify([progress]))

    let completedGoals = goals.filter(goal => goal.complete === true)
    let incompletedGoals = goals.filter(goal => goal.complete === false)
    //reset completed goals
    if (completedGoals.length === goals.length)
      this.resetAllGoals(this.props.userId, habit.habitId, completedGoals)

    return (
      <div className="container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div className="user-habit__box">
            <div className="user-habit__progress">
              <div>{habit.habit.name}</div>
              <GoalProgress habit={habit} progress={goalProgress[0]} />
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
                    Uncompleted:{' '}
                  </h5>
                  {incompletedGoals.length ? (
                    incompletedGoals.map(goal => (
                      <div className="checkbox-box" key={goal.goal.id}>
                        <div className="checkbox">
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

                        <span
                          className="checkbox-delete"
                          onClick={this.props.delete.bind(this, goal)}
                        >
                          <Icon
                            name="trash alternate"
                            className="delete-icon"
                          />
                        </span>
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
                      <div className="checkbox-box" key={goal.goal.id}>
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

                        <span
                          className="checkbox-delete"
                          onClick={this.props.delete.bind(this, goal)}
                        >
                          <Icon
                            name="trash alternate"
                            className="delete-icon"
                          />
                        </span>
                      </div>
                    ))
                  ) : (
                    <h5 className="user-goals__empty">
                      You haven't completed any daily goals yet
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
  console.log('state ', state)
  return {
    goals: state.goals,
    userId: state.user.id,
    progress: state.progress.progress
  }
}
const mapDispatch = dispatch => {
  return {
    getUserProgress: (userId, habitId, id) => {
      dispatch(fetchUserProgress(userId, habitId, id))
    },
    getUserGoals: (userId, habitId) => {
      dispatch(fetchUserGoals(userId, habitId))
    },
    postNewGoal: (userId, habitId, goal) => {
      dispatch(postGoal(userId, habitId, goal))
    },
    update(userGoal, userId, habitId, incrXP, evt) {
      // console.log('habit.id ', habitId)
      if (!evt.target.checked) incrXP = -1
      else incrXP = +1
      dispatch(updateUser(userGoal.goal.habitId, incrXP, habitId))
      dispatch(
        updateGoal(
          userGoal.userId,
          userGoal.goal.habitId,
          userGoal.id,
          evt.target.checked
        )
      )

      //gets prev progress
      dispatch(fetchUserProgress(userId, userGoal.goal.habitId, habitId))
      //get updated progress
      dispatch(fetchUserProgress(userId, userGoal.goal.habitId, habitId))
    },
    reset(userId, habitId, goalId) {
      dispatch(resetGoals(userId, habitId, goalId))
    },
    delete(userGoal) {
      dispatch(
        deleteGoal(
          userGoal.goal.id,
          userGoal.id,
          userGoal.userId,
          userGoal.goal.habitId
        )
      )
    }
  }
}

export default connect(mapState, mapDispatch)(UserHabit)
UserHabit.propTypes = {
  goals: PropTypes.array
}
