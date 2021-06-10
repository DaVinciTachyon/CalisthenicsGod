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
      if (err.response?.status === 400)
        if (err.response?.status === 400)
          console.error(err.response.data.error);
        else console.error(err.response);
      else console.error(err.response);
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
