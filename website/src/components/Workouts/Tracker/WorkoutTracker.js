import React from 'react'
import Workout from './Workout'
import { Button } from '../../../style/buttons'
import { connect } from 'react-redux'
import { getWorkouts } from '../../../stateManagement/reducers/workouts'

class WorkoutTracker extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getWorkouts()
  }

  render() {
    return (
      <div>
        <Button
          onClick={() => (window.location = '/workoutTracker/new')}
          fullWidth
        >
          +
        </Button>
        {this.props.workouts.history.map((workout) => (
          <Workout key={workout._id} details={workout} />
        ))}
      </div>
    )
  }
}

export default connect(({ workouts }) => ({ workouts }), {
  getWorkouts,
})(WorkoutTracker)
