import React from 'react';
import { Row, Column } from '../../../style/table';
import {
  Text,
  Calories,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs';
import { getCalories } from '../util';
import { connect } from 'react-redux';

class ConsumedIngredientSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    };
  }

  componentDidMount() {
    this.setMacros();
    if (this.props.ingredients.available.length === 0)
      this.props.setIngredients();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.ingredientIds !== this.props.ingredientIds ||
      prevProps.ingredients.available !== this.props.ingredients.available ||
      prevProps.ingredients.unavailable !== this.props.ingredients.unavailable
    )
      this.setMacros();
  }

  getCalories = () => {
    const { fat, carbohydrate, protein, ethanol } = this.state;
    return getCalories(fat, carbohydrate, protein, ethanol);
  };

  setMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.props.ingredientIds.forEach((ingredient) => {
      const { macronutrients } = this.props.ingredients.available.find(
        (ing) => ingredient._id === ing._id
      ) ||
        this.props.ingredients.unavailable.find(
          (ing) => ingredient._id === ing._id
        ) || {
          macronutrients: { fat: 0, carbohydrate: 0, protein: 0, ethanol: 0 },
        };
      fat += (ingredient.weight * macronutrients.fat) / 100;
      carbohydrate += (ingredient.weight * macronutrients.carbohydrate) / 100;
      protein += (ingredient.weight * macronutrients.protein) / 100;
      ethanol += (ingredient.weight * macronutrients.ethanol) / 100;
    });
    this.setState({
      fat,
      carbohydrate,
      protein,
      ethanol,
    });
  };

  render() {
    return (
      <Row columns={9} className="emphasis">
        <Column span={2}>
          <Text value="Summary" readOnly />
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Column />
        <Fat value={this.state.fat} readOnly />
        <Carbohydrate value={this.state.carbohydrate} readOnly />
        <Protein value={this.state.protein} readOnly />
        <Ethanol value={this.state.ethanol} readOnly />
        <Column />
      </Row>
    );
  }
}

export default connect(
  ({ ingredients }) => ({ ingredients }),
  {}
)(ConsumedIngredientSummary);
