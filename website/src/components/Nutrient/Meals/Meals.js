import React from 'react';
import MealRow from './MealRow';
import MealAdder from './MealAdder';

export default class Meals extends React.Component {
  constructor() {
    super();
    this.state = {
      meals: [],
      macroDensities: {
        fat: 9,
        carbohydrate: 4,
        protein: 4,
        ethanol: 7,
      },
    };
  }

  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/names/`,
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

  render() {
    const meals = [];
    this.state.meals.forEach((meal) =>
      meals.push(
        <MealRow
          key={meal._id}
          id={meal._id}
          name={meal.name}
          macroDensities={this.state.macroDensities}
          onUpdate={this.getMeals}
        />
      )
    );
    return (
      <div>
        <MealRow isTitle />
        <MealAdder
          macroDensities={this.state.macroDensities}
          onSubmit={this.getMeals}
        />
        {meals}
      </div>
    );
  }
}
