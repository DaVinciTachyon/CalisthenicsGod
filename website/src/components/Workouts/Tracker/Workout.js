import React from 'react'
import Stage from './Stage'

export default class Workout extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <>
        {this.props.details.stages.map((stage) => (
          <Stage key={stage._id} details={stage} />
        ))}
      </>
    )
  }
}
