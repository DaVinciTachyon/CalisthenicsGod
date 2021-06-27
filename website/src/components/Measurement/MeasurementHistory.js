import React from 'react'
import { connect } from 'react-redux'
import { getMeasurementHistory } from '../../stateManagement/reducers/measurements'
import { Paper } from '@material-ui/core'
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  SplineSeries,
  ScatterSeries,
  Tooltip,
  Title,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-material-ui'
import { EventTracker } from '@devexpress/dx-react-chart'

class MeasurementHistory extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getMeasurementHistory('weight')
  }

  getDateArray = (start, end) => {
    const dates = []
    let currentDate = new Date(start)
    while (currentDate <= new Date(end)) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  dayDifference = (startDate, endDate) =>
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (24 * 60 * 60 * 1000)

  render() {
    const dataObj = {}
    if (this.props.measurements.weight)
      this.props.measurements.weight.forEach((item) => {
        const date = new Date(item.date).toDateString()
        const obj = (dataObj[date] = dataObj[date] || {
          count: 0,
          total: 0,
        })
        obj.count++
        obj.total += item.value
      })
    const data = Object.entries(dataObj)
      .map((entry) => ({
        date: entry[0],
        value: entry[1].total / entry[1].count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    let currentIndex = 0
    let currentValue = 0
    let currentAdder = 0
    const timeSeries =
      data.length > 0
        ? this.getDateArray(data[currentIndex].date, new Date())?.map(
            (date) => {
              let enteredValue
              if (
                new Date(date).getTime() >=
                  new Date(data[currentIndex].date).getTime() &&
                currentIndex <= data.length - 1
              ) {
                enteredValue = currentValue = data[currentIndex].value
                if (currentIndex < data.length - 1) {
                  currentAdder =
                    (data[currentIndex + 1].value - currentValue) /
                    this.dayDifference(
                      data[currentIndex].date,
                      data[currentIndex + 1].date,
                    )
                  currentIndex++
                } else if (currentIndex === data.length - 1) {
                  currentAdder = 0
                }
              } else {
                currentValue += currentAdder
              }
              return {
                date: date.toLocaleDateString(),
                value: currentValue,
                enteredValue,
              }
            },
          )
        : []
    return (
      <Paper>
        <Chart data={timeSeries}>
          <ArgumentAxis />
          <ValueAxis />
          <Title text="Weight over Time" />

          <SplineSeries argumentField="date" valueField="value" />
          <ScatterSeries argumentField="date" valueField="enteredValue" />

          <EventTracker />
          <Tooltip />
          <ZoomAndPan />
        </Chart>
      </Paper>
    )
  }
}

export default connect(({ measurements }) => ({ measurements }), {
  getMeasurementHistory,
})(MeasurementHistory)
