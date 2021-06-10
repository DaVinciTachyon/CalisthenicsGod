import React from 'react';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
  constructor() {
    super();
    this.state = {
      macroDensities: {
        fat: 9,
        carbohydrate: 4,
        protein: 4,
        ethanol: 7,
      },
      update: true,
    };
  }

  onUpdate = () => this.setState({ update: !this.state.update });

  render() {
    return (
      <div>
        <IngredientList
          macroDensities={this.state.macroDensities}
          update={this.state.update}
          onUpdate={this.onUpdate}
        />
        <IngredientList
          isUnavailable={true}
          macroDensities={this.state.macroDensities}
          update={this.state.update}
          onUpdate={this.onUpdate}
        />
      </div>
    );
  }
}
