import React from 'react'
import WorkoutHistory from './WorkoutHistory'
import { Button } from '../../../style/buttons'
import { Link } from 'react-router-dom'
import Microcycle from './Microcycle'

export default class WorkoutTracker extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Microcycle />
        <Link to="/workoutTracker/new">
          <Button fullWidth>+</Button>
        </Link>
        <WorkoutHistory />
      </div>
    )
  }
}
