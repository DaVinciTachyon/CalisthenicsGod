import React from 'react';
import NutrientSummary from './NutrientSummary';
import MealSelect from './MealSelect';
import Card from '../../../style/card';
import MealIngredientAdder from './MealIngredientAdder';
import ConsumedMeal from './ConsumedMeal';

export default class NutrientTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      macroDensities: {
        fat: 9,
        carbohydrate: 4,
        protein: 4,
        ethanol: 7,
      },
      isAddingMeal: false,
      meals: [],
    };
  }

  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/today/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ meals: data.meals });
  };

  addMeal = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/nutrition/meals/addPreset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
  };

  render() {
    const meals = [];
    this.state.meals.forEach((meal) =>
      meals.push(
        <ConsumedMeal
          key={meal._id}
          id={meal._id}
          ingredients={meal.ingredients}
          macroDensities={this.state.macroDensities}
          onUpdate={this.getMeals}
        />
      )
    );
    return (
      <div>
        <Card>
          <NutrientSummary
            macroDensities={this.state.macroDensities}
            meals={this.state.meals}
          />
        </Card>
        {!this.state.isAddingMeal && (
          <MealSelect
            onSubmit={async (id) => {
              if (id === '') this.setState({ isAddingMeal: true });
              else {
                await this.addMeal(id);
                this.getMeals();
              }
            }}
          />
        )}
        {this.state.isAddingMeal && (
          <MealIngredientAdder
            onSubmit={() => {
              this.setState({ isAddingMeal: false });
              this.getMeals();
            }}
            onCancel={() => this.setState({ isAddingMeal: false })}
            macroDensities={this.state.macroDensities}
          />
        )}
        {meals}
      </div>
    );
  }
}
