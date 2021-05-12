import React from 'react';
import MealIngredient from './MealIngredient';
import MealIngredientAdd from './MealIngredientAdd';

export default class MealEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const ingredients = [];
    this.props.ingredients.forEach((ingredient) =>
      ingredients.push(
        <MealIngredient
          key={ingredient._id}
          id={ingredient._id}
          mealId={this.props.id}
          name={ingredient.name}
          weight={ingredient.weight}
          fat={ingredient.fat}
          carbohydrate={ingredient.carbohydrate}
          protein={ingredient.protein}
          ethanol={ingredient.ethanol}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
        />
      )
    );
    return (
      <div>
        <MealIngredient isTitle />
        {ingredients}
        <MealIngredientAdd
          id={this.props.id}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
        />
      </div>
    );
  }
}
