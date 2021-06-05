import React from 'react';
import { Button } from '../../../style/buttons';
import ExerciseRow from './ExerciseRow';
import ExerciseAdder from './ExerciseAdder';
import { Section } from '../../../style/table';

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
    // motion, kinetic chain
    const exercises = this.state.exercises.reduce((exercises, exercise) => {
      let transversePlane = exercise.motionType.transversePlane;
      exercises[transversePlane] = exercises[transversePlane] || [];
      exercises[transversePlane].push(exercise);
      return exercises;
    }, {});
    Object.keys(exercises).forEach(
      (transversePlane) =>
        (exercises[transversePlane] = exercises[transversePlane].reduce(
          (exercises, exercise) => {
            let frontalPlane = exercise.motionType.frontalPlane;
            exercises[frontalPlane] = exercises[frontalPlane] || [];
            exercises[frontalPlane].push(exercise);
            return exercises;
          },
          {}
        ))
    );
    Object.keys(exercises).forEach((transversePlane) =>
      Object.keys(exercises[transversePlane]).forEach(
        (frontalPlane) =>
          (exercises[transversePlane][frontalPlane] = exercises[
            transversePlane
          ][frontalPlane].reduce((exercises, exercise) => {
            let verticality = exercise.motionType.verticality;
            exercises[verticality] = exercises[verticality] || [];
            exercises[verticality].push(exercise);
            return exercises;
          }, {}))
      )
    );
    return (
      <div>
        {!this.state.isAdding && (
          <Button
            className="maxWidth"
            onClick={() => this.setState({ isAdding: true })}
          >
            Add Exercise
          </Button>
        )}
        {this.state.isAdding && (
          <ExerciseAdder
            onSubmit={this.onSubmit}
            onCancel={() => this.setState({ isAdding: false })}
          />
        )}
        {Object.keys(exercises).map((transversePlane) => (
          <Section label={transversePlane}>
            {Object.keys(exercises[transversePlane]).map((frontalPlane) => (
              <Section label={frontalPlane}>
                {Object.keys(exercises[transversePlane][frontalPlane]).map(
                  (verticality) => (
                    <Section label={verticality}>
                      <ExerciseRow isTitle />
                      {exercises[transversePlane][frontalPlane][
                        verticality
                      ].map((exercise) => (
                        <ExerciseRow
                          key={exercise._id}
                          id={exercise._id}
                          exercise={exercise}
                          onUpdate={this.getExercises}
                        />
                      ))}
                    </Section>
                  )
                )}
              </Section>
            ))}
          </Section>
        ))}
      </div>
    );
  }
}
