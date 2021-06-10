import React from 'react';
import { Row, Column } from '../../../style/table';
import { Text } from '../../../style/inputs';
import { Button, DeleteButton } from '../../../style/buttons';
import StageSelect from '../StageSelect';
import ExerciseSelect from '../ExerciseSelect';
import ExerciseAdder from './ExerciseAdder';
import axios from 'axios';

export default class ExerciseRow extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
    };
  }

  onSubmit = async (exercise) => {
    try {
      await axios.patch('/exercise/', exercise);
      await this.props.onUpdate();
      this.setState({ isEditing: false });
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  onRemove = async () => {
    try {
      await axios.delete('/exercise/', {
        _id: this.props.id,
      });
      this.props.onUpdate();
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

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
      );
    if (!this.state.isEditing)
      return (
        <Row columns={9}>
          <Text value={this.props.exercise.name} readOnly />
          <Text value={this.props.exercise.abbreviation} readOnly />
          {this.props.exercise.motionType.componentExercises &&
            this.props.exercise.motionType.componentExercises.length > 0 && (
              <Column span={3}>
                <ExerciseSelect
                  value={this.props.exercise.motionType.componentExercises}
                  readOnly
                  isMulti
                  label="Component Exercises"
                />
              </Column>
            )}
          {(!this.props.exercise.motionType.componentExercises ||
            this.props.exercise.motionType.componentExercises?.length ===
              0) && (
            <Column span={3} columns={3}>
              <Text value={this.props.exercise.motionType.motion} readOnly />
              <Text
                value={this.props.exercise.motionType.kineticChain}
                readOnly
              />
              <Text
                value={this.props.exercise.motionType.sagittalPlane}
                readOnly
              />
            </Column>
          )}
          <StageSelect
            value={this.props.exercise.potentialStages}
            readOnly
            isMulti
          />
          <ExerciseSelect
            value={this.props.exercise.requirements}
            readOnly
            isMulti
          />
          <Text value={this.props.exercise.description} readOnly />
          <Column>
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            <DeleteButton onClick={this.onRemove}>Remove</DeleteButton>
          </Column>
        </Row>
      );
    return (
      <ExerciseAdder
        id={this.props.id}
        exercise={this.props.exercise}
        onSubmit={this.onSubmit}
        onCancel={() =>
          this.setState({
            isEditing: false,
          })
        }
      />
    );
  }
}
