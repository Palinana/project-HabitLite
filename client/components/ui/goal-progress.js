import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

const getData = percent => {
  return [{x: 1, y: percent}, {x: 2, y: 100 - percent}]
}

const GoalProgress = props => {
  return (
    <div className="chart">
      {props.levelledUp ? (
        <div className="level-up__box">
          <div className="level-up__wrapper">
            <div className="level-up__title">Great job!</div>
            <div className="level-up__subtitle">You've reached level</div>
            <div className="level-up__level">{props.level}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={400}
          height={400}
          data={getData(props.progress)} //for progress bar %
          innerRadius={props.category ? 0 : 120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: d => {
                let color
                if (d.y > 0 && d.y < 30) {
                  color = '#ef8d8d'
                }
                if (d.y >= 30 && d.y < 50) {
                  color = '#f7ebba'
                }
                if (d.y >= 50) {
                  color = '#badac5'
                }
                return d.x === 1 ? color : 'transparent'
              }
            }
          }}
        />
        <VictoryAnimation duration={1000} data={props}>
          {() => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(props.progress)}%`} //the actual data of the progress bar
                style={{fontSize: 45}}
              />
            )
          }}
        </VictoryAnimation>
      </svg>
    </div>
  )
}

const mapState = state => {
  return {
    goals: state.user.goals,
    xp: state.user.xp,
    levelledUp: state.user.levelledUp,
    level: state.user.level
  }
}

export default connect(mapState)(GoalProgress)

GoalProgress.propTypes = {
  progress: PropTypes.number
}
