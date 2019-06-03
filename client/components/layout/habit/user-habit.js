import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../summary/user-panel'
import Progress from '../../ui/progress'
import {Icon} from 'semantic-ui-react'

import {fetchUserGoals, postGoal} from '../../../store'

class UserHabit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
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
    const goals = this.props.goals.map(x => ({...x.goal}))
    const habit = this.props.location.state.habit
    const userId = this.props.location.state.userId
    console.log('goals ', this.props.goals)

    return (
      <div className="container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div className="user-habit__box">
            <div className="user-habit__progress">
              <div>{habit.habit.name}</div>
              <Progress habit={habit} />
            </div>

            <div className="user-habit__goals">
              <div className="user-habit__goals-box">
                <h5 className="user-habit__goals-title">Your daily goals</h5>
                <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
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
              </div>

              <div>
                {goals &&
                  goals.map(goal => (
                    <div className="checkbox" key={goal.id}>
                      <label>
                        <input type="checkbox" value="" />
                        <span className="cr">
                          <Icon name="check" className="cr-icon" />
                        </span>
                        {goal.description}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
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
    }
  }
}

export default connect(mapState, mapDispatch)(UserHabit)

UserHabit.propTypes = {
  user: PropTypes.object
}
