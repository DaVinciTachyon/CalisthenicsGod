import React from 'react';
import MealIngredient from './MealIngredient';
import MealIngredientAdd from './MealIngredientAdd';

export default class MealEditor extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { ingredients, id, onUpdate } = this.props;
    return (
      <div>
        <MealIngredient isTitle />
        {ingredients.map(({ _id, name, weight, macronutrients }) => (
          <MealIngredient
            key={_id}
            id={_id}
            mealId={id}
            name={name}
            weight={weight}
            macronutrients={macronutrients}
            onUpdate={onUpdate}
          />
        ))}
        <MealIngredientAdd id={id} onUpdate={onUpdate} />
      </div>
    );
  }
}
