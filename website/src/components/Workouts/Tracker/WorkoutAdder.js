import React from 'react';
import { Row, Column, Title } from '../../../style/table';
import StageEditor from './StageEditor';
import { Button, ErrorButton } from '../../../style/buttons';
import { connect } from 'react-redux';
import { setStages } from '../../../stateManagement/reducers/stages';
import {
  addWorkout,
  setCurrentWorkout,
} from '../../../stateManagement/reducers/workouts';
import { loadState } from '../../util';

class WorkoutAdder extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.stages.length === 0) this.props.setStages();
    const state = loadState('currentWorkout');
    if (state) this.props.setCurrentWorkout(state);
  }

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
        {this.props.stages.map(({ _id }) => (
          <StageEditor
            key={_id}
            id={_id}
            details={
              this.props.workouts.current.stages?.find(
                (stage) => _id === stage.id
              ) || undefined
            }
          />
        ))}
        <Row>
          <Button
            onClick={() => this.props.addWorkout(this.props.workouts.current)}
          >
            Submit
          </Button>
          <ErrorButton onClick={() => (window.location = '/workoutTracker')}>
            Cancel
          </ErrorButton>
        </Row>
      </div>
    );
  }
}

export default connect(({ stages, workouts }) => ({ stages, workouts }), {
  setStages,
  addWorkout,
  setCurrentWorkout,
})(WorkoutAdder);
