import React, {PureComponent} from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

let data = []

//number of days in a month
const monthDays = (month, year) => {
  return new Date(year, month, 0).getDate()
}

let days = monthDays(new Date().getMonth() + 1, new Date().getFullYear())

//fill out the data array with number of days
for (let i = 1; i <= days; i++) {
  //from 0-30
  data.push({day: i})
}

const renderTooltipContent = ({payload, label, active}) => {
  if (active) {
    return payload[0].value !== 0 ? (
      <div className="custom-tooltip">
        <p className="label">
          {payload[0].value > 1
            ? `Day ${label} : completed ${payload[0].value} goals`
            : `Day ${label} : completed ${payload[0].value} goal`}
        </p>
      </div>
    ) : null
  }

  return null
}

class ActivityChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/Lrffmzfc/'

  render() {
    // //number of user goals for the chart
    let numberOfGoals = this.props.goals

    //fill out the data array with goals completed
    let finalData = []
    let currentDate = new Date().getDate()

    for (let i = 0; i < days; i++) {
      if (i >= currentDate - 1) {
        finalData[i] = {...data[i], goals: 0}
      } else {
        let numGoalsCompleted = Math.floor(Math.random() * numberOfGoals) + 1 //from 1 to 8
        finalData[i] = {...data[i], goals: numGoalsCompleted}
      }
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={finalData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip
            content={renderTooltipContent}
            wrapperStyle={{width: 100, backgroundColor: '#e2e2e24f'}}
          />
          <Area
            type="monotone"
            dataKey="goals"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }
}

export default ActivityChart
