import React from 'react';
import { Link } from 'react-router-dom';
import Workout from './Workout';
import { Button } from '../../style/buttons';

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
    const workouts = [];
    this.state.workouts.forEach((workout) =>
      workouts.push(<Workout details={workout} />)
    );
    return (
      <div>
        <Link to="/workoutTracker/new">
          <Button>+</Button>
        </Link>
        {workouts}
      </div>
    );
  }
}
