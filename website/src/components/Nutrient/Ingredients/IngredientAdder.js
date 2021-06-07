import React from 'react';
import { Button, ErrorButton } from '../../../style/buttons';
import { Row, Column } from '../../../style/table';
import {
  Text,
  Calories,
  Weight,
  Fat,
  Carbohydrate,
  Protein,
  Ethanol,
} from '../../../style/inputs';
import axios from 'axios';

export default class IngredientAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
      name: '',
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      weight: 100,
    };
  }

  onSubmit = async () => {
    await axios.post('/nutrition/ingredients/', {
      name: this.state.name,
      macronutrients: {
        fat: this.state.fat,
        carbohydrate: this.state.carbohydrate,
        protein: this.state.protein,
        ethanol: this.state.ethanol,
      },
    });
    await this.props.onSubmit();
    this.resetState();
  };

  resetState = () =>
    this.setState({
      isAdding: false,
      name: '',
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    });

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  getCalories = () => {
    const { fat, carbohydrate, protein, ethanol, weight } = this.state;
    const { macroDensities } = this.props;
    return (
      ((fat * macroDensities.fat +
        carbohydrate * macroDensities.carbohydrate +
        protein * macroDensities.protein +
        ethanol * macroDensities.ethanol) *
        weight) /
      100
    );
  };

  render() {
    if (this.state.isAdding)
      return (
        <Row columns={9} className="input">
          <Column span={2}>
            <Text
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </Column>
          <Calories value={this.getCalories()} readOnly />
          <Weight value={this.state.weight} readOnly />
          <Fat name="fat" onChange={this.onChange} value={this.state.fat} />
          <Carbohydrate
            name="carbohydrate"
            onChange={this.onChange}
            value={this.state.carbohydrate}
          />
          <Protein
            name="protein"
            onChange={this.onChange}
            value={this.state.protein}
          />
          <Ethanol
            name="ethanol"
            onChange={this.onChange}
            value={this.state.ethanol}
          />
          <Column>
            <Button onClick={this.onSubmit}>Submit</Button>
            <ErrorButton onClick={this.resetState}>Cancel</ErrorButton>
          </Column>
        </Row>
      );
    return (
      <Button
        className="maxWidth thin"
        onClick={() => this.setState({ isAdding: true })}
      >
        Add
      </Button>
    );
  }
}
