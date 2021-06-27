import React from 'react'
import { Title } from '../../../style/table'
import StageEditor from './StageEditor'
import { Button, ErrorButton } from '../../../style/buttons'
import { connect } from 'react-redux'
import { getStages } from '../../../stateManagement/reducers/stages'
import {
  addWorkout,
  getCurrentWorkout,
} from '../../../stateManagement/reducers/workouts'

class WorkoutAdder extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getStages()
    this.props.getCurrentWorkout()
  }

  render() {
    return (
      <div>
        <Title>New Workout</Title>
        {this.props.stages.map(({ _id }) => (
          <StageEditor
            key={_id}
            id={_id}
            details={this.props.workouts.current.stages?.find(
              (stage) => _id === stage.id,
            )}
          />
        ))}
        <Button
          onClick={() => this.props.addWorkout(this.props.workouts.current)}
          fullWidth
        >
          Submit
        </Button>
        <ErrorButton
          onClick={() => (window.location = '/workoutTracker')}
          fullWidth
        >
          Cancel
        </ErrorButton>
      </div>
    )
  }
}

export default connect(({ stages, workouts }) => ({ stages, workouts }), {
  getStages,
  addWorkout,
  getCurrentWorkout,
})(WorkoutAdder)
