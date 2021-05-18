import React from 'react';
import { Row, Title } from '../../../style/table';
import { Button } from '../../../style/buttons';
import ExerciseRow from './ExerciseRow';

export default class StageEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
    };
  }

  update = () =>
    this.props.onUpdate({ id: this.props.id, exercises: this.state.exercises });

  addExercise = async (index, length) => {
    await this.setState((state) => {
      if (state.exercises.length < length + 1)
        state.exercises.splice(index, 0, {});

      return { exercises: state.exercises };
    });
    this.update();
  };

  onRemove = async (index, length) => {
    await this.setState((state) => {
      if (state.exercises.length > length - 1) state.exercises.splice(index, 1);

      return { exercises: state.exercises };
    });
    this.update();
  };

  onUpdate = async (index, exercise) => {
    await this.setState((state) => {
      state.exercises[index] = exercise;

      return { exercises: state.exercises };
    });
    this.update();
  };

  addButton = (i) => (
    <Row>
      <Button
        className="maxWidth thin"
        onClick={() => this.addExercise(i, this.state.exercises.length)}
      >
        +
      </Button>
    </Row>
  );

  render() {
    return (
      <div>
        <Row>
          <Title>{this.props.name}</Title>
        </Row>
        {this.state.exercises.map((exercise, i, exercises) => (
          <ExerciseRow
            key={i}
            onUpdate={(exercise) => this.onUpdate(i, exercise)}
            onRemove={() => this.onRemove(i, exercises.length)}
          />
        ))}
        {this.addButton(this.state.exercises.length)}
      </div>
    );
  }
}
