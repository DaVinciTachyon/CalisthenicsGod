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
    const ingredients = [];
    this.props.ingredients.forEach((ingredient) =>
      ingredients.push(
        <ConsumedIngredient
          key={ingredient._id}
          mealId={this.props.id}
          _id={ingredient._id}
          id={ingredient.id}
          name={ingredient.name}
          weight={ingredient.weight}
          macros={ingredient.macronutrients}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
        />
      )
    );
    return (
      <div>
        <ConsumedIngredient isTitle />
        {ingredients}
        <ConsumedIngredientAdder
          id={this.props.id}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
        />
        <ConsumedIngredientSummary
          ingredients={this.props.ingredients}
          macroDensities={this.props.macroDensities}
        />
      </div>
    );
  }
}
