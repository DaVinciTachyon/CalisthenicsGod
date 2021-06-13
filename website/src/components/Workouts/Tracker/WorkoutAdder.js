import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import StageEditor from './StageEditor';
import { Button, ErrorButton } from '../../../style/buttons';
import axios from 'axios';
import { connect } from 'react-redux';
import { setStages } from '../../../stateManagement/reducers/stages';

class WorkoutAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      workout: {
        stages: [],
      },
    };
  }

  componentDidMount() {
    if (this.props.stages.length === 0) this.props.setStages();
  }

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
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
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
        {this.props.stages.map((stage) => (
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

export default connect(({ stages }) => ({ stages }), {
  setStages,
})(WorkoutAdder);
