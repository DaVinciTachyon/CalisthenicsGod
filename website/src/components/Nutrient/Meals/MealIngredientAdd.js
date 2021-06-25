import React from 'react'
import { Button } from '../../../style/buttons'
import MealIngredientAdder from '../Tracker/MealIngredientAdder'

export default class MealIngredientAdd extends React.Component {
  constructor() {
    super()
    this.state = { isAdding: false }
  }

  render() {
    if (this.state.isAdding)
      return (
        <MealIngredientAdder
          id={this.props.id}
          onSubmit={() => this.setState({ isAdding: false })}
          onCancel={() => this.setState({ isAdding: false })}
          isPreset
        />
      )
    return (
      <Button
        size="small"
        onClick={() => this.setState({ isAdding: true })}
        fullWidth
      >
        Add
      </Button>
    )
  }
}
