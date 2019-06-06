import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const UserPanel = props => {
  const {userId, avatar, email, level, lives, HP, XP} = props

  return (
    <div className="user-panel__box">
      <div className="user-panel__left">
        <Link to={`/home/users/${userId}`}>
          <img
            className="user-panel__user-image"
            alt="User photo"
            src={avatar}
          />
        </Link>

        <span className="user-panel__user-name">Welcome, {email}</span>
      </div>

      <div className="user-panel__right">
        <div className="user-panel__item">
          <div className="user-panel__item-top">Level</div>
          <div className="user-panel__item-bottom">{level}</div>
        </div>
        <div className="user-panel__item">
          <div className="user-panel__item-top">Lives</div>
          <div className="user-panel__item-bottom">{lives}</div>
        </div>
        <div className="user-panel__item">
          <div className="user-panel__item-top">HP</div>
          <div className="user-panel__item-bottom">{HP}</div>
        </div>
        <div className="user-panel__item">
          <div className="user-panel__item-top">XP</div>
          <div className="user-panel__item-bottom">{XP}</div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    userId: state.user.id,
    avatar: state.user.avatar,
    email: state.user.email,
    level: state.user.level,
    lives: state.user.lives,
    HP: state.user.hp,
    XP: state.user.xp
  }
}

export default connect(mapState)(UserPanel)

UserPanel.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
  HP: PropTypes.number.isRequired,
  XP: PropTypes.number.isRequired
}
