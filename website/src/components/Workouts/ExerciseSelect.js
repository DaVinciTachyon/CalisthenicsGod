import React from 'react';
import { Select } from '../../style/inputs';

export default class ExerciseSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
      exerciseOptions: [],
      fullExercises: [],
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
    const exerciseOptions = [];
    data.exercises.forEach((exercise) => {
      if (
        !this.props.stage ||
        (this.props.stage &&
          exercise.potentialStages.includes(this.props.stage))
      )
        exerciseOptions.push(exercise);
    });
    this.setState({ exerciseOptions });
  };

  onChange = async (evt) => {
    await this.setState({ [evt.name]: evt.value });
    const exercises = this.state.exerciseOptions.filter((exercise) => {
      if (this.props.isMulti) return evt.value.includes(exercise._id);
      return evt.value === exercise._id;
    });
    this.props.onChange(evt, this.props.isMulti ? exercises : exercises[0]);
  };

  render() {
    return (
      <Select
        options={[{ label: 'Choose Exercise', value: '' }].concat(
          this.state.exerciseOptions.map((exercise) => {
            return { label: exercise.name, value: exercise._id };
          })
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
