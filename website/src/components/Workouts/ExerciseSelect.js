import React from 'react';
import { Select } from '../../style/inputs';
import axios from 'axios';

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
    try {
      const data = (await axios.get('/exercise/')).data;
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
    } catch (err) {
      if (err.response.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
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
