import React from 'react';
import NutrientSummary from './NutrientSummary';
import MealSelect from '../MealSelect';
import Card from '../../../style/card';
import MealIngredientAdder from './MealIngredientAdder';
import ConsumedMeal from './ConsumedMeal';
import axios from 'axios';

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
    try {
      const { meals } = (await axios.get('/nutrition/meals/')).data;
      this.setState({ meals });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  addMeal = async (id) => {
    try {
      await axios.post('/nutrition/meals/addPreset/', {
        _id: id,
      });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  render() {
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
        {this.state.meals.map((meal) => (
          <ConsumedMeal
            key={meal._id}
            id={meal._id}
            ingredients={meal.ingredients}
            macroDensities={this.state.macroDensities}
            onUpdate={this.getMeals}
          />
        ))}
      </div>
    );
  }
}
