import React from 'react';
import MacroSummaryRow from './MacroSummaryRow';
import axios from 'axios';
import { connect } from 'react-redux';
import { setIngredients } from '../../../stateManagement/reducers/ingredients';

class NutrientSummary extends React.Component {
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
    if (this.props.ingredients.available.length === 0)
      this.props.setIngredients();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.meals !== this.props.meals ||
      prevProps.ingredients.available !== this.props.ingredients.available ||
      prevProps.ingredients.unavailable !== this.props.ingredients.unavailable
    )
      this.getMacros();
  }

  getMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.props.meals.forEach((meal) =>
      meal.ingredients.forEach((ingredient) => {
        const { macronutrients } = this.props.ingredients.available.find(
          (ingredient) => ingredient._id === this.props.id
        ) ||
          this.props.ingredients.unavailable.find(
            (ingredient) => ingredient._id === this.props.id
          ) || {
            macronutrients: { fat: 0, carbohydrate: 0, protein: 0, ethanol: 0 },
          };
        fat += (ingredient.weight * macronutrients.fat) / 100;
        carbohydrate += (ingredient.weight * macronutrients.carbohydrate) / 100;
        protein += (ingredient.weight * macronutrients.protein) / 100;
        ethanol += (ingredient.weight * macronutrients.ethanol) / 100;
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
        />
        <MacroSummaryRow
          name="Current"
          fat={this.state.current.fat}
          carbohydrate={this.state.current.carbohydrate}
          protein={this.state.current.protein}
          ethanol={this.state.current.ethanol}
        />
        <MacroSummaryRow
          name="Left"
          fat={this.state.goal.fat - this.state.current.fat}
          carbohydrate={
            this.state.goal.carbohydrate - this.state.current.carbohydrate
          }
          protein={this.state.goal.protein - this.state.current.protein}
          ethanol={this.state.goal.ethanol - this.state.current.ethanol}
        />
      </div>
    );
  }

  getUserGoals = async () => {
    try {
      const { macronutrients } = (await axios.get('/nutrition/goals')).data;
      this.setState({
        goal: macronutrients,
      });
    } catch (err) {
      if (err.response?.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };
}

export default connect(({ ingredients }) => ({ ingredients }), {
  setIngredients,
})(NutrientSummary);
