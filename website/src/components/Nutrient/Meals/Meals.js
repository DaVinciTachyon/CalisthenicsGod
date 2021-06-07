import React from 'react';
import MealRow from './MealRow';
import MealAdder from './MealAdder';
import axios from 'axios';

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
    const { meals } = (await axios.get('/nutrition/meals/preset/names/')).data;
    this.setState({ meals });
  };

  render() {
    return (
      <div>
        <MealRow isTitle />
        <MealAdder
          macroDensities={this.state.macroDensities}
          onSubmit={this.getMeals}
        />
        {this.state.meals.map((meal) => (
          <MealRow
            key={meal._id}
            id={meal._id}
            name={meal.name}
            macroDensities={this.state.macroDensities}
            onUpdate={this.getMeals}
          />
        ))}
      </div>
    );
  }
}
