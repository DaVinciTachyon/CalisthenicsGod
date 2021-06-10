import React from 'react';
import ConsumedIngredient from './ConsumedIngredient';
import ConsumedIngredientSummary from './ConsumedIngredientSummary';
import ConsumedIngredientAdder from './ConsumedIngredientAdder';

export default class ConsumedMeal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <ConsumedIngredient isTitle />
        {this.props.ingredients.map((ingredient) => (
          <ConsumedIngredient
            key={ingredient._id}
            mealId={this.props.id}
            ingredient={ingredient}
          />
        ))}
        <ConsumedIngredientAdder id={this.props.id} />
        <ConsumedIngredientSummary ingredientIds={this.props.ingredients} />
      </div>
    );
  }
}
