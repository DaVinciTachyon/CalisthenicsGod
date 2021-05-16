import React from 'react';
import { Row, Column } from '../../style/table';
import { Text } from '../../style/inputs';
import { Button, DeleteButton } from '../../style/buttons';
import StageSelect from './StageSelect';
import ExerciseSelect from './ExerciseSelect';
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
      await this.setState({ isEditing: false });
      this.props.onUpdate();
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
              <Column>Transverse Plane</Column>
              <Column>Kinetic Chain</Column>
              <Column>Verticality</Column>
              <Column>Frontal Plane</Column>
              <Column>Motion</Column>
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
          <Column>
            <Text value={this.props.exercise.name} readOnly />
          </Column>
          <Column>
            <Text value={this.props.exercise.abbreviation} readOnly />
          </Column>
          <Column span={5} columns={5}>
            <Column>
              <Text
                value={this.props.exercise.motionType.transversePlane}
                readOnly
              />
            </Column>
            <Column>
              <Text
                value={this.props.exercise.motionType.kineticChain}
                readOnly
              />
            </Column>
            <Column>
              <Text
                value={this.props.exercise.motionType.verticality}
                readOnly
              />
            </Column>
            <Column>
              <Text
                value={this.props.exercise.motionType.frontalPlane}
                readOnly
              />
            </Column>
            <Column>
              <Text value={this.props.exercise.motionType.motion} readOnly />
            </Column>
          </Column>
          <Column>
            <StageSelect
              defaultValue={this.props.exercise.potentialStages}
              readOnly
            />
          </Column>
          <Column>
            <ExerciseSelect
              defaultValue={this.props.exercise.requirements}
              readOnly
            />
          </Column>
          <Column>
            <Text value={this.props.exercise.description} readOnly />
          </Column>
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
