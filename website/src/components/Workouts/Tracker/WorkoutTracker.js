import React from 'react';
import Workout from './Workout';
import { Button } from '../../../style/buttons';
import { connect } from 'react-redux';
import { setWorkouts } from '../../../stateManagement/reducers/workouts';

class WorkoutTracker extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.workouts.length === 0) this.props.setWorkouts();
  }

  render() {
    return (
      <div>
        <Button
          className="maxWidth"
          onClick={() => (window.location = '/workoutTracker/new')}
        >
          +
        </Button>
        {this.props.workouts.map((workout) => (
          <Workout key={workout._id} details={workout} />
        ))}
      </div>
    );
  }
}

export default connect(({ workouts }) => ({ workouts }), {
  setWorkouts,
})(WorkoutTracker);
