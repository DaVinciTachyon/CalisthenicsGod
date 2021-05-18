import React from 'react';
import { Row, Column } from '../../../style/table';
import { Button } from '../../../style/buttons';
import ExerciseRow from './ExerciseRow';
import ExerciseAdder from './ExerciseAdder';

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
      isAdding: false,
    };
  }

  componentDidMount() {
    this.getExercises();
  }

  getExercises = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/exercise/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    this.setState({ exercises: data.exercises });
  };

  onSubmit = async (exercise) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/exercise/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify(exercise),
    });
    if (response.status === 200) {
      await this.getExercises();
      this.setState({ isAdding: false });
    } else {
      const data = await response.json();
      return data.error;
    }
  };

  render() {
    return (
      <div>
        <ExerciseRow isTitle />
        <Row columns={11}>
          <Column span={11}>
            {!this.state.isAdding && (
              <Button
                className="maxWidth"
                onClick={() => this.setState({ isAdding: true })}
              >
                +
              </Button>
            )}
            {this.state.isAdding && (
              <ExerciseAdder
                onSubmit={this.onSubmit}
                onCancel={() => this.setState({ isAdding: false })}
              />
            )}
          </Column>
        </Row>
        {this.state.exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            id={exercise._id}
            exercise={exercise}
            onUpdate={this.getExercises}
          />
        ))}
      </div>
    );
  }
}
