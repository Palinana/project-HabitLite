import React from 'react'
import Progress from '../../ui/progress'

const UserSingleHabit = ({habit}) => {
  return (
    <div className="col-lg-4 col-md-4 mb-4 d-flex">
      <div className="card flex-fill">
        <div className="card-body">
          <h5 className="card-title user-summary__card-title">
            {habit.habit.name}
          </h5>

          <p className="card-text">
            <div className="user-summary__card-progress">
              <Progress habit={habit} />
            </div>
          </p>
        </div>

        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
  )
}

export default UserSingleHabit
