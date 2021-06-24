import React from 'react'
import { Row, Column } from '../../../style/table'
import { Text } from '../../../style/inputs'
import { Button, DeleteButton } from '../../../style/buttons'
import StageSelect from '../StageSelect'
import ExerciseSelect from '../ExerciseSelect'
import ExerciseAdder from './ExerciseAdder'
import { connect } from 'react-redux'
import {
  modifyExercise,
  removeExercise,
} from '../../../stateManagement/reducers/exercises'
import { ButtonGroup } from '@material-ui/core'

class ExerciseRow extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
    }
  }

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={9} isTitle>
          <Column>Name</Column>
          <Column>Abbreviation</Column>
          <Column>Motion</Column>
          <Column>Kinetic Chain</Column>
          <Column>Sagittal Plane</Column>
          <Column>Potential Stages</Column>
          <Column>Requirements</Column>
          <Column>Description</Column>
          <Column />
        </Row>
      )
    if (!this.state.isEditing)
      return (
        <Row columns={9}>
          <Text value={this.props.exercise.name} disabled />
          <Text value={this.props.exercise.abbreviation} disabled />
          {this.props.exercise.motionType.componentExercises &&
            this.props.exercise.motionType.componentExercises.length > 0 && (
              <Column span={3}>
                <ExerciseSelect
                  value={this.props.exercise.motionType.componentExercises}
                  disabled
                  multiple
                  label="Component Exercises"
                />
              </Column>
            )}
          {(!this.props.exercise.motionType.componentExercises ||
            this.props.exercise.motionType.componentExercises?.length ===
              0) && (
            <Column span={3} columns={3}>
              <Text value={this.props.exercise.motionType.motion} disabled />
              <Text
                value={this.props.exercise.motionType.kineticChain}
                disabled
              />
              <Text
                value={this.props.exercise.motionType.sagittalPlane}
                disabled
              />
            </Column>
          )}
          <StageSelect
            value={this.props.exercise.potentialStages}
            disabled
            multiple
          />
          <ExerciseSelect
            value={this.props.exercise.requirements}
            disabled
            multiple
          />
          <Text value={this.props.exercise.description} disabled />
          <ButtonGroup orientation="vertical">
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            <DeleteButton
              onClick={() => this.props.removeExercise(this.props.id)}
            >
              Remove
            </DeleteButton>
          </ButtonGroup>
        </Row>
      )
    return (
      <ExerciseAdder
        id={this.props.id}
        exercise={this.props.exercise}
        onSubmit={(exercise) => {
          this.props.modifyExercise(exercise)
          this.setState({ isEditing: false })
        }}
        onCancel={() =>
          this.setState({
            isEditing: false,
          })
        }
      />
    )
  }
}

export default connect(() => ({}), {
  modifyExercise,
  removeExercise,
})(ExerciseRow)
