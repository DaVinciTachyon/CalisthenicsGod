import React from 'react';
import { Button } from '../../../style/buttons';
import MealIngredientAdder from './MealIngredientAdder';

export default class ConsumedIngredientAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
    };
  }

  render() {
    if (this.state.isAdding)
      return (
        <MealIngredientAdder
          id={this.props.id}
          onSubmit={() => {
            this.setState({ isAdding: false });
            this.props.onUpdate();
          }}
          onCancel={() => this.setState({ isAdding: false })}
        />
      );
    return (
      <Button
        className="maxWidth thin"
        onClick={() => this.setState({ isAdding: true })}
      >
        Add
      </Button>
    );
  }
}
