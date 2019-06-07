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
        <div className="level-up">Level {props.level}!</div>
      ) : (
        <div />
      )}
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={400}
          height={400}
          data={getData(props.goalProgress)}
          innerRadius={props.category ? 0 : 120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: d => {
                let color
                if (d.y > 0 && d.y < 30) {
                  color = '#cac9f3'
                }
                if (d.y > 30 && d.y < 50) {
                  color = '#908ece'
                }
                if (d.y > 50) {
                  color = '#696ba0'
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
                text={`${Math.round(props.goalProgress)}%`}
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
  let goalProgress = 0

  if (state.goals.length) {
    console.log('state.goals ', state.goals.length)
    console.log('state.xp ', state.user.xp)
    // let percent = 100/state.goals.length

    goalProgress = state.user.xp + 1
  }

  return {
    goals: state.user.goals,
    xp: state.user.xp,
    goalProgress: goalProgress,
    levelledUp: state.user.levelledUp,
    level: state.user.level
  }
}

export default connect(mapState)(GoalProgress)

GoalProgress.propTypes = {
  progress: PropTypes.number
}
