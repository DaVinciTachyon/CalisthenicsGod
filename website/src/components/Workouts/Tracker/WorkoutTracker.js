import React from 'react';
import Workout from './Workout';
import { Button } from '../../../style/buttons';

export default class WorkoutTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      workouts: [],
    };
    this.getWorkouts = this.getWorkouts.bind(this);
  }

  componentDidMount() {
    this.getWorkouts();
  }

  getWorkouts = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    this.setState({ workouts: data.workouts });
  };

  render() {
    return (
      <div>
        <Button
          className="maxWidth"
          onClick={() => (window.location = '/workoutTracker/new')}
        >
          +
        </Button>
        {this.state.workouts.map((workout) => (
          <Workout key={workout._id} details={workout} />
        ))}
      </div>
    );
  }
}
