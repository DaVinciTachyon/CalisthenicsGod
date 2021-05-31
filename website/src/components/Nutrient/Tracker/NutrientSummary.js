import React from 'react';
import MacroSummaryRow from './MacroSummaryRow';

export default class NutrientSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      goal: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
      current: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
    };
  }

  componentDidMount() {
    this.getUserGoals();
    this.getMacros();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.getMacros();
  }

  getMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.props.meals.forEach((meal) =>
      meal.ingredients.forEach((ingredient) => {
        fat += (ingredient.weight * ingredient.macronutrients.fat) / 100;
        carbohydrate +=
          (ingredient.weight * ingredient.macronutrients.carbohydrate) / 100;
        protein +=
          (ingredient.weight * ingredient.macronutrients.protein) / 100;
        ethanol +=
          (ingredient.weight * ingredient.macronutrients.ethanol) / 100;
      })
    );
    this.setState({ current: { fat, carbohydrate, protein, ethanol } });
  };

  render() {
    return (
      <div>
        <MacroSummaryRow isTitle />
        <MacroSummaryRow
          name="Goal"
          fat={this.state.goal.fat}
          carbohydrate={this.state.goal.carbohydrate}
          protein={this.state.goal.protein}
          ethanol={this.state.goal.ethanol}
          macroDensities={this.props.macroDensities}
        />
        <MacroSummaryRow
          name="Current"
          fat={this.state.current.fat}
          carbohydrate={this.state.current.carbohydrate}
          protein={this.state.current.protein}
          ethanol={this.state.current.ethanol}
          macroDensities={this.props.macroDensities}
        />
        <MacroSummaryRow
          name="Left"
          fat={this.state.goal.fat - this.state.current.fat}
          carbohydrate={
            this.state.goal.carbohydrate - this.state.current.carbohydrate
          }
          protein={this.state.goal.protein - this.state.current.protein}
          ethanol={this.state.goal.ethanol - this.state.current.ethanol}
          macroDensities={this.props.macroDensities}
        />
      </div>
    );
  }

  getUserGoals = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/nutrition/goals/`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          goal: data.macronutrients,
        })
      );
  };
}
