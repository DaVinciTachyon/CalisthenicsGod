import React from 'react';
import { Select } from '../../style/inputs';

export default class ExerciseSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [],
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
        exercises.push(exercise);
    });
    this.setState({ exercises });
  };

  onChange = (evt) => {
    const exercises = this.state.exercises.filter((exercise) => {
      if (this.props.isMulti) return evt.value.includes(exercise._id);
      return evt.value === exercise._id;
    });
    this.props.onChange(evt, this.props.isMulti ? exercises : exercises[0]);
  };

  render() {
    const { isMulti, onChange, ...rest } = this.props;
    return (
      <Select
        options={(isMulti
          ? []
          : [{ label: 'Choose Exercise', value: '' }]
        ).concat(
          this.state.exercises.map((exercise) => {
            return { label: exercise.name, value: exercise._id };
          })
        )}
        onChange={this.onChange}
        isMulti={isMulti}
        {...rest}
      />
    );
  }
}
