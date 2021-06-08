import React from 'react';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
  constructor() {
    super();
    this.state = {
      update: true,
    };
  }

  onUpdate = () => this.setState({ update: !this.state.update });

  render() {
    return (
      <div>
        <IngredientList update={this.state.update} onUpdate={this.onUpdate} />
        <IngredientList
          isUnavailable={true}
          update={this.state.update}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}
