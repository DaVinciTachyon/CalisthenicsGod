import React from 'react';
import { Button } from '../../../style/buttons';
import ExerciseRow from './ExerciseRow';
import ExerciseAdder from './ExerciseAdder';
import { Section } from '../../../style/table';
import axios from 'axios';

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
    const { exercises } = (await axios.get('/exercise/')).data;
    this.setState({ exercises });
  };

  onSubmit = async (exercise) => {
    await axios.post('/exercise/', exercise);
    await this.getExercises();
    this.setState({ isAdding: false });
  };

  render() {
    const exercises = this.state.exercises.reduce((exercises, exercise) => {
      const hasComponents =
        exercise.motionType.componentExercises &&
        exercise.motionType.componentExercises.length > 0
          ? 'component'
          : 'singular';
      exercises[hasComponents] = exercises[hasComponents] || [];
      exercises[hasComponents].push(exercise);
      return exercises;
    }, {});
    exercises['singular'] =
      exercises['singular']?.reduce((exercises, exercise) => {
        let transversePlane = exercise.motionType.transversePlane;
        exercises[transversePlane] = exercises[transversePlane] || [];
        exercises[transversePlane].push(exercise);
        return exercises;
      }, {}) || [];
    Object.keys(exercises['singular']).forEach(
      (transversePlane) =>
        (exercises['singular'][transversePlane] = exercises['singular'][
          transversePlane
        ].reduce((exercises, exercise) => {
          let frontalPlane = exercise.motionType.frontalPlane;
          exercises[frontalPlane] = exercises[frontalPlane] || [];
          exercises[frontalPlane].push(exercise);
          return exercises;
        }, {}))
    );
    Object.keys(exercises['singular']).forEach((transversePlane) =>
      Object.keys(exercises['singular'][transversePlane]).forEach(
        (frontalPlane) =>
          (exercises['singular'][transversePlane][frontalPlane] = exercises[
            'singular'
          ][transversePlane][frontalPlane].reduce((exercises, exercise) => {
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
        {Object.keys(exercises['singular']).map((transversePlane) => (
          <Section label={transversePlane}>
            {Object.keys(exercises['singular'][transversePlane]).map(
              (frontalPlane) => (
                <Section label={frontalPlane}>
                  {Object.keys(
                    exercises['singular'][transversePlane][frontalPlane]
                  ).map((verticality) => (
                    <Section label={verticality}>
                      <ExerciseRow isTitle />
                      {exercises['singular'][transversePlane][frontalPlane][
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
                  ))}
                </Section>
              )
            )}
          </Section>
        ))}
        {exercises['component'] && (
          <Section label="Combinational Exercises">
            {exercises['component'].map((exercise) => (
              <ExerciseRow
                key={exercise._id}
                id={exercise._id}
                exercise={exercise}
                onUpdate={this.getExercises}
              />
            ))}
          </Section>
        )}
      </div>
    );
  }
}
