import React from 'react'
import MeasurementSummary from './MeasurementSummary'
import MeasurementHistory from './MeasurementHistory'

export default class MeasurementTracker extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <MeasurementSummary />
        <MeasurementHistory />
      </div>
    )
  }
}
