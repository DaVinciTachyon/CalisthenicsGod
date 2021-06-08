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
            _id={ingredient._id}
            id={ingredient.id}
            name={ingredient.name}
            weight={ingredient.weight}
            macros={ingredient.macronutrients}
            onUpdate={this.props.onUpdate}
          />
        ))}
        <ConsumedIngredientAdder
          id={this.props.id}
          onUpdate={this.props.onUpdate}
        />
        <ConsumedIngredientSummary ingredients={this.props.ingredients} />
      </div>
    );
  }
}
