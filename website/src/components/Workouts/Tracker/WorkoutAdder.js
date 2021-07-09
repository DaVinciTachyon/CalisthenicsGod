import React from 'react'
import { Row, Title } from '../../../style/table'
import StageEditor from './StageEditor'
import { Button, ErrorButton } from '../../../style/buttons'
import { connect } from 'react-redux'
import { getStages } from '../../../stateManagement/reducers/stages'
import {
  addWorkout,
  getCurrentWorkout,
  setCurrentWorkout,
  getWorkouts,
} from '../../../stateManagement/reducers/workouts'
import { Link } from 'react-router-dom'
import { Select } from '../../../style/inputs'

class WorkoutAdder extends React.Component {
  constructor() {
    super()
    this.state = { workoutToCopy: undefined }
  }

  componentDidMount() {
    this.props.getStages()
    this.props.getCurrentWorkout()
    this.props.getWorkouts()
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  render() {
    return (
      <div>
        <Title>New Workout</Title>
        <Row columns={2}>
          <Select
            name="workoutToCopy"
            options={this.props.workouts.history

              .map((workout) => ({
                label: workout.date,
                value: workout._id,
              }))
              .sort((a, b) => new Date(b.label) - new Date(a.label))}
            value={this.state.workoutToCopy}
            onChange={this.onChange}
            label="Workout to Copy"
          />
          <Button
            onClick={() => {
              const workout = this.props.workouts.history.find(
                (workout) => workout._id === this.state.workoutToCopy,
              )
              if (workout) {
                const { stages } = workout
                this.props.setCurrentWorkout({ stages })
              }
            }}
          >
            Copy
          </Button>
        </Row>
        {this.props.stages.map(({ _id }) => (
          <StageEditor
            key={_id}
            id={_id}
            details={this.props.workouts.current?.stages?.find(
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
        <Link to="/workoutTracker">
          <ErrorButton fullWidth>Cancel</ErrorButton>
        </Link>
      </div>
    )
  }
}

export default connect(({ stages, workouts }) => ({ stages, workouts }), {
  getStages,
  addWorkout,
  getCurrentWorkout,
  setCurrentWorkout,
  getWorkouts,
})(WorkoutAdder)
