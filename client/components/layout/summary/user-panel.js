import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserPanel = props => {
  const {avatar, email, level, lives, HP, XP} = props

  return (
    <div className="user-panel__box">
      <div className="user-panel__left">
        <img className="user-panel__user-image" alt="User photo" src={avatar} />
        {/* <h4 className="user-panel__user-name__box"> */}
        <span className="user-panel__user-name">Welcome, {email}</span>
        {/* </h4> */}
        {/* <span className="user-panel__user-name">Welcome, {email}</span> */}
      </div>

      <div className="user-panel__right">
        <div className="user-panel__item">
          <div className="user-panel__item-top">Level</div>
          <div className="user-panel__item-bottom">{level + 1}</div>
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
