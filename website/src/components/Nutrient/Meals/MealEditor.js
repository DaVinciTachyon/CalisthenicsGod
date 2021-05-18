import React from 'react';
import MealIngredient from './MealIngredient';
import MealIngredientAdd from './MealIngredientAdd';

export default class MealEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <MealIngredient isTitle />
        {this.props.ingredients.map((ingredient) => (
          <MealIngredient
            key={ingredient._id}
            id={ingredient._id}
            mealId={this.props.id}
            name={ingredient.name}
            weight={ingredient.weight}
            macronutrients={ingredient.macronutrients}
            macroDensities={this.props.macroDensities}
            onUpdate={this.props.onUpdate}
          />
        ))}
        <MealIngredientAdd
          id={this.props.id}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
        />
      </div>
    );
  }
}
