import React from 'react';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <IngredientList />
        <IngredientList isUnavailable={true} />
      </div>
    );
  }
}
