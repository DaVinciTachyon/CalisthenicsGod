import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import StageEditor from './StageEditor';
import { Button, ErrorButton } from '../../../style/buttons';

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
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/workout/stage/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ stages: data.stages });
  };

  onUpdate = (stage) =>
    this.setState((state) => {
      const index = state.workout.stages.findIndex((s) => s.id === stage.id);
      if (index !== -1) state.workout.stages[index] = stage;
      else state.workout.stages.push(stage);

      return { workout: state.workout };
    });

  onSubmit = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify(this.state.workout),
    });
    if (response.status === 200) {
      window.location = '/workoutTracker';
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  render() {
    return (
      <div>
        <Title>New Workout</Title>
        <Row columns={5} isTitle>
          <Column>Sets</Column>
          <Column>Type</Column>
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
        <Row>
          <Column>
            <Button onClick={this.onSubmit}>Submit</Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <ErrorButton onClick={() => (window.location = '/workoutTracker')}>
              Cancel
            </ErrorButton>
          </Column>
        </Row>
      </div>
    );
  }
}
