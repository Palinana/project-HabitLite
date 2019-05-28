import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import UserPanel from '../summary/user-panel'
import Progress from '../../ui/progress'

import {fetchUserGoals, postGoal} from '../../../store'

class UserHabit extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const userId = this.props.location.state.userId
    this.props.getUserGoals(userId)
  }

  render() {
    const goals = this.props.goals.map(x => ({...x.goal}))
    const habit = this.props.location.state.habit
    const userId = this.props.location.state.userId

    return (
      <div className="container">
        <div className="block">
          <UserPanel />
        </div>

        <div className="block">
          <div className="user-habit__box">
            <div className="user-habit__progress">
              <Progress habit={habit} />
            </div>

            <div className="user-habit__goals">
              {goals.map(goal => (
                <div className="checkbox" key={goal.id}>
                  <label>
                    <input type="checkbox" value="" />
                    <span className="cr">
                      <i className="cr-icon glyphicon glyphicon-ok" />
                    </span>
                    {goal.description}
                  </label>
                </div>
              ))}
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    getUserGoals: id => {
      dispatch(fetchUserGoals(id))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHabit)

UserHabit.propTypes = {
  user: PropTypes.object
}
