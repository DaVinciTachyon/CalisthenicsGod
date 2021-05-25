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

export default class ConsumedIngredientSummary extends React.Component {
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.setMacros();
  }

  getCalories = () =>
    this.state.fat * this.props.macroDensities.fat +
    this.state.carbohydrate * this.props.macroDensities.carbohydrate +
    this.state.protein * this.props.macroDensities.protein +
    this.state.ethanol * this.props.macroDensities.ethanol;

  setMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.props.ingredients.forEach((ingredient) => {
      fat += (ingredient.weight * ingredient.macronutrients.fat) / 100;
      carbohydrate +=
        (ingredient.weight * ingredient.macronutrients.carbohydrate) / 100;
      protein += (ingredient.weight * ingredient.macronutrients.protein) / 100;
      ethanol += (ingredient.weight * ingredient.macronutrients.ethanol) / 100;
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
