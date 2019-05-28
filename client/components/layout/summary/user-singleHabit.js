import React from 'react'
import {Link} from 'react-router-dom'
import Progress from '../../ui/progress'

const UserSingleHabit = ({habit, userId}) => {
  return (
    <div className="col-lg-4 col-md-4 mb-4 d-flex">
      <div className="card flex-fill">
        <Link
          to={{
            pathname: `/home/users/${userId}/habits/${habit.id}`,
            state: {
              habit: habit,
              userId: userId
            }
          }}
        >
          <div className="card-body">
            <h5 className="card-title user-summary__card-title">
              {habit.habit.name}
            </h5>

            <div className="card-text">
              <div className="user-summary__card-progress">
                <Progress habit={habit} />
              </div>
            </div>
          </div>

          <div className="card-footer">
            <small className="text-muted">Last updated 3 mins ago</small>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default UserSingleHabit
