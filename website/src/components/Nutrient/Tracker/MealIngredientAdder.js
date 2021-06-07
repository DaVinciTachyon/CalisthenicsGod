import React from 'react';
import IngredientSelect from '../IngredientSelect';
import { Row, Column } from '../../../style/table';
import { Text, Calories } from '../../../style/inputs';
import { SuccessButton, ErrorButton } from '../../../style/buttons';
import IngredientMacroRow from './IngredientMacroRow';
import axios from 'axios';

export default class MealIngredientAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      weight: 0,
      name: '',
      id: '',
    };
  }

  onIngredientChange = (ingredient) => {
    if (ingredient === undefined)
      this.setState({
        id: '',
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      });
    else {
      this.setState({
        id: ingredient._id,
        fat: ingredient.macronutrients.fat,
        carbohydrate: ingredient.macronutrients.carbohydrate,
        protein: ingredient.macronutrients.protein,
        ethanol: ingredient.macronutrients.ethanol,
      });
    }
  };

  getCalories = () =>
    ((this.state.fat * this.props.macroDensities.fat +
      this.state.carbohydrate * this.props.macroDensities.carbohydrate +
      this.state.protein * this.props.macroDensities.protein +
      this.state.ethanol * this.props.macroDensities.ethanol) *
      this.state.weight) /
    100;

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    const id =
      (this.state.id === '' ? undefined : this.state.id) ||
      (await this.addIngredient());
    let url = '/nutrition/meals/';
    if (this.props.isPreset) url += 'preset/ingredient/';
    await axios.post(url, {
      _id: this.props.id,
      ingredient: {
        id,
        weight: this.state.weight,
      },
    });
    this.props.onSubmit();
  };

  addIngredient = async () => {
    const { _id } = (
      await axios.post('/nutrition/ingredients/', {
        name: this.state.name,
        macronutrients: {
          fat: this.state.fat,
          carbohydrate: this.state.carbohydrate,
          protein: this.state.protein,
          ethanol: this.state.ethanol,
        },
      })
    ).data;
    return _id;
  };

  onCancel = () => this.props.onCancel();

  render() {
    return (
      <Row columns={11} className="input">
        <Column span={2}>
          <IngredientSelect
            value={this.state.id}
            onChange={this.onIngredientChange}
            label="Ingredient"
          />
          {this.state.id === '' && (
            <Text
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          )}
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Column span={7}>
          <IngredientMacroRow isTitle />
          <IngredientMacroRow
            name="Net Weight"
            onChange={({ weight }) => this.setState({ weight })}
            weight={this.state.weight}
            fat={(this.state.fat * this.state.weight) / 100}
            carbohydrate={(this.state.carbohydrate * this.state.weight) / 100}
            protein={(this.state.protein * this.state.weight) / 100}
            ethanol={(this.state.ethanol * this.state.weight) / 100}
          />
          <IngredientMacroRow
            name="Base Weight"
            onChange={({ fat, carbohydrate, protein, ethanol }) =>
              this.setState({ fat, carbohydrate, protein, ethanol })
            }
            isBaseline
            macroReadOnly={this.state.id !== ''}
            weight={100}
            fat={this.state.fat}
            carbohydrate={this.state.carbohydrate}
            protein={this.state.protein}
            ethanol={this.state.ethanol}
            className="emphasis"
          />
        </Column>
        <Column>
          <SuccessButton onClick={this.onSubmit}>Submit</SuccessButton>
          <ErrorButton onClick={this.onCancel}>Cancel</ErrorButton>
        </Column>
      </Row>
    );
  }
}
