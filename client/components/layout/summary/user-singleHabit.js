import React from 'react'
import Progress from '../../ui/progress'

const UserSingleHabit = ({habit}) => {
  return (
    <div className="col-md-4 col-xs-6 user-summary__card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title user-summary__card-title">
            {habit.habit.name}
          </h5>
          <p className="card-text">
            <div className="user-summary__card-progress">
              <Progress habit={habit} />
            </div>
          </p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSingleHabit
