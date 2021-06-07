import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import StageEditor from './StageEditor';
import { Button, ErrorButton } from '../../../style/buttons';
import axios from 'axios';

export default class WorkoutAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      stages: [],
      workout: {
        stages: [],
      },
    };
    this.getStages = this.getStages.bind(this);
  }

  componentDidMount() {
    this.getStages();
  }

  getStages = async () => {
    try {
      const { stages } = (await axios.get('/workout/stage/')).data;
      this.setState({ stages });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  onUpdate = (stage) =>
    this.setState((state) => {
      const index = state.workout.stages.findIndex((s) => s.id === stage.id);
      if (index !== -1) state.workout.stages[index] = stage;
      else state.workout.stages.push(stage);

      return { workout: state.workout };
    });

  onSubmit = async () => {
    try {
      await axios.post('/workout/', this.state.workout);
      window.location = '/workoutTracker';
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  render() {
    return (
      <div>
        <Title>New Workout</Title>
        <Row columns={7} isTitle>
          <Column>Sets</Column>
          <Column>Weighted</Column>
          <Column>Variation</Column>
          <Column>Sagittal Plane</Column>
          <Column>Exercise</Column>
          <Column>
            <Column>Rest</Column>
            <Row columns={2}>
              <Column>Intraset</Column>
              <Column>Interset</Column>
            </Row>
          </Column>
          <Column />
        </Row>
        {this.state.stages.map((stage) => (
          <StageEditor
            key={stage._id}
            id={stage._id}
            name={stage.name}
            onUpdate={this.onUpdate}
          />
        ))}
        <Button onClick={this.onSubmit}>Submit</Button>
        <ErrorButton onClick={() => (window.location = '/workoutTracker')}>
          Cancel
        </ErrorButton>
      </div>
    );
  }
}
