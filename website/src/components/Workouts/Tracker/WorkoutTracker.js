import React from 'react';
import Workout from './Workout';
import { Button } from '../../../style/buttons';
import axios from 'axios';

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
    try {
      const { workouts } = (await axios.get('/workout/')).data;
      this.setState({ workouts });
    } catch (err) {
      console.error(err.response.data.error);
    }
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
