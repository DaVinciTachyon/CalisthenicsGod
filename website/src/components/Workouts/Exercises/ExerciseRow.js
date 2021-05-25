import React from 'react';
import { Row, Column } from '../../../style/table';
import { Text } from '../../../style/inputs';
import { Button, DeleteButton } from '../../../style/buttons';
import StageSelect from '../StageSelect';
import ExerciseSelect from '../ExerciseSelect';
import ExerciseAdder from './ExerciseAdder';

export default class ExerciseRow extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
    };
  }

  onSubmit = async (exercise) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/exercise/edit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify(exercise),
      }
    );
    if (response.status === 200) {
      await this.props.onUpdate();
      this.setState({ isEditing: false });
    } else {
      const data = await response.json();
      return data.error;
    }
  };

  onRemove = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/exercise/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: this.props.id,
      }),
    });
    this.props.onUpdate();
  };

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={11} isTitle>
          <Column>Name</Column>
          <Column>Abbreviation</Column>
          <Column span={5}>
            <Column span={5}>Motion Type</Column>
            <Column span={5} columns={5}>
              <Column>Motion</Column>
              <Column>Transverse Plane</Column>
              <Column>Kinetic Chain</Column>
              <Column>Verticality</Column>
              <Column>Frontal Plane</Column>
            </Column>
          </Column>
          <Column>Potential Stages</Column>
          <Column>Requirements</Column>
          <Column>Description</Column>
          <Column />
        </Row>
      );
    if (!this.state.isEditing)
      return (
        <Row columns={11}>
          <Text value={this.props.exercise.name} readOnly />
          <Text value={this.props.exercise.abbreviation} readOnly />
          <Column span={5} columns={5}>
            <Text value={this.props.exercise.motionType.motion} readOnly />
            {this.props.exercise.motionType.motion === 'distance' && (
              <Column span={4} />
            )}
            {this.props.exercise.motionType.motion !== 'distance' && (
              <>
                <Text
                  value={this.props.exercise.motionType.transversePlane}
                  readOnly
                />
                <Text
                  value={this.props.exercise.motionType.kineticChain}
                  readOnly
                />
                <Text
                  value={this.props.exercise.motionType.verticality}
                  readOnly
                />
                <Text
                  value={this.props.exercise.motionType.frontalPlane}
                  readOnly
                />
              </>
            )}
          </Column>
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
