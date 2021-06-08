import React from 'react';
import MealRow from './MealRow';
import MealAdder from './MealAdder';
import axios from 'axios';

export default class Meals extends React.Component {
  constructor() {
    super();
    this.state = {
      meals: [],
    };
  }

  componentDidMount() {
    this.getMeals();
  }

  getMeals = async () => {
    try {
      const { meals } = (await axios.get('/nutrition/meals/preset/names/'))
        .data;
      this.setState({ meals });
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  render() {
    return (
      <div>
        <MealRow isTitle />
        <MealAdder onSubmit={this.getMeals} />
        {this.state.meals.map((meal) => (
          <MealRow
            key={meal._id}
            id={meal._id}
            name={meal.name}
            onUpdate={this.getMeals}
          />
        ))}
      </div>
    );
  }
}
