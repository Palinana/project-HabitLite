import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserPanel = props => {
  //   const { avatar, username, level, lives, HP, XP } = props

  return (
    <div className="row">
      <div className="user-panel__container">
        <div className="user-panel__left">
          <img
            className="user-panel__user-image"
            alt="User photo"
            src="/images/user-1.jpeg"
          />
          <span className="user-panel__user-name">
            Welcome, djfldl@gmail.com
          </span>
        </div>

        <div className="user-panel__right">
          <div className="user-panel__item">
            <div className="user-panel__item-top">Level</div>
            <div className="user-panel__item-bottom">3</div>
          </div>
          <div className="user-panel__item">
            <div className="user-panel__item-top">Lives</div>
            <div className="user-panel__item-bottom">2</div>
          </div>
          <div className="user-panel__item">
            <div className="user-panel__item-top">HP</div>
            <div className="user-panel__item-bottom">400</div>
          </div>
          <div className="user-panel__item">
            <div className="user-panel__item-top">XP</div>
            <div className="user-panel__item-bottom">30</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  // console.log("STATEINUSERIS", state)
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    level: state.user.level,
    lives: state.user.lives,
    HP: state.user.hp,
    XP: state.user.xp
  }
}

export default connect(mapState)(UserPanel)

// UserPanel.propTypes = {
//   avatar: PropTypes.string.isRequired,
//   username: PropTypes.string.isRequired,
//   level: PropTypes.number.isRequired,
//   lives: PropTypes.number.isRequired,
//   HP: PropTypes.number.isRequired,
//   XP: PropTypes.number.isRequired
// }
