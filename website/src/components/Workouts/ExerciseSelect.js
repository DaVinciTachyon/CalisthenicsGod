import React from 'react';
import { Select } from '../../style/inputs';

export default class ExerciseSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
      exerciseOptions: [],
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
    const exercises = [];
    data.exercises.forEach((exercise) => {
      if (
        !this.props.stage ||
        (this.props.stage &&
          exercise.potentialStages.includes(this.props.stage))
      )
        exercises.push({ label: exercise.name, value: exercise._id });
    });
    this.setState({ exerciseOptions: exercises });
  };

  onChange = async (evt) => {
    await this.setState({ [evt.name]: evt.value });
    this.props.onChange(evt);
  };

  render() {
    return (
      <Select
        options={[{ label: 'Choose Exercise', value: '' }].concat(
          this.state.exerciseOptions
        )}
        name={this.props.name || 'exercises'}
        defaultValue={this.props.defaultValue}
        onChange={this.onChange}
        isMulti={this.props.isMulti}
        readOnly={this.props.readOnly}
      />
    );
  }
}
