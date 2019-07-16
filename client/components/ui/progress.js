import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'

const getData = percent => {
  return [{x: 1, y: percent}, {x: 2, y: 100 - percent}]
}

const Progress = props => {
  return (
    <div className="chart">
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{duration: 1000}}
          width={400}
          height={400}
          data={getData(props.progress)}
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
                text={`${Math.round(props.progress)}%`}
                style={{fontSize: 45}}
              />
            )
          }}
        </VictoryAnimation>
      </svg>
    </div>
  )
}

const mapState = (state, ownProps) => {
  let progress
  if (ownProps.habit) {
    progress = state.user.xp ? state.user.xp / ownProps.habit.XP * 10 : 0
    if (progress > 100) progress = 100
  }

  return {
    progress: progress,
    levelledUp: state.user.levelledUp,
    level: state.user.level
  }
}

export default connect(mapState)(Progress)

Progress.propTypes = {
  progress: PropTypes.number
}
