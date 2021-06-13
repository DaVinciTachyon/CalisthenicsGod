import React from 'react';
import { Select } from '../../style/inputs';
import { connect } from 'react-redux';
import { setExercises } from '../../stateManagement/reducers/exercises';

class ExerciseSelect extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.exercises.length === 0) this.props.setExercises();
  }

  onChange = (evt) => {
    const exercises = this.props.exercises.filter((exercise) => {
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
          this.props.exercises
            .filter(
              (exercise) =>
                (!this.props.stage ||
                  (this.props.stage &&
                    exercise.potentialStages.includes(this.props.stage))) &&
                (!this.props.unavailable ||
                  (this.props.unavailable &&
                    !this.props.unavailable.includes(exercise._id)))
            )
            .map((exercise) => ({ label: exercise.name, value: exercise._id }))
        )}
        onChange={this.onChange}
        isMulti={isMulti}
        {...rest}
      />
    );
  }
}

export default connect(({ exercises }) => ({ exercises }), {
  setExercises,
})(ExerciseSelect);
