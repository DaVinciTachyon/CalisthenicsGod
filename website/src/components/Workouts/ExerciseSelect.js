import React from 'react'
import { Select } from '../../style/inputs'
import { connect } from 'react-redux'
import { getExercises } from '../../stateManagement/reducers/exercises'

class ExerciseSelect extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getExercises()
  }

  onChange = (evt) => {
    const exercises = this.props.exercises.filter((exercise) => {
      if (this.props.multiple) return evt.target.value.includes(exercise._id)
      return evt.target.value === exercise._id
    })
    this.props.onChange(evt, this.props.multiple ? exercises : exercises[0])
  }

  render() {
    const { multiple, onChange, ...rest } = this.props
    return (
      <Select
        searchable
        options={this.props.exercises
          .filter((exercise) => exercise.isAvailable)
          .filter(
            (exercise) =>
              !this.props.unavailable ||
              (this.props.unavailable &&
                !this.props.unavailable.includes(exercise._id)),
          )
          .filter(
            (exercise) =>
              !this.props.stage ||
              (this.props.stage &&
                exercise.potentialStages.includes(this.props.stage)),
          )
          .map((exercise) => ({ label: exercise.name, value: exercise._id }))}
        onChange={this.onChange}
        multiple={multiple}
        {...rest}
      />
    )
  }
}

export default connect(({ exercises }) => ({ exercises }), {
  getExercises,
})(ExerciseSelect)
