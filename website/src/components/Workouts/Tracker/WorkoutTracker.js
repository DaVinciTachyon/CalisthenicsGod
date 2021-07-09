import React from 'react'
import WorkoutHistory from './WorkoutHistory'
import { Button } from '../../../style/buttons'
import { Link } from 'react-router-dom'

export default class WorkoutTracker extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Link to="/workoutTracker/new">
          <Button fullWidth>+</Button>
        </Link>
        <WorkoutHistory />
      </div>
    )
  }
}
