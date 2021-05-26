import React from 'react';
import IngredientSelect from '../IngredientSelect';
import { Row, Column } from '../../../style/table';
import { Text, Calories } from '../../../style/inputs';
import { SuccessButton, ErrorButton } from '../../../style/buttons';
import IngredientMacroRow from './IngredientMacroRow';

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
    let url = `${process.env.REACT_APP_API_URL}/nutrition/meals/`;
    if (this.props.isPreset)
      url = `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredient/add/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: this.props.id,
        ingredient: {
          id,
          weight: this.state.weight,
        },
      }),
    });
    if (response.status === 200) this.props.onSubmit();
    else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  addIngredient = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/ingredients/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          name: this.state.name,
          macronutrients: {
            fat: this.state.fat,
            carbohydrate: this.state.carbohydrate,
            protein: this.state.protein,
            ethanol: this.state.ethanol,
          },
        }),
      }
    );
    const data = await response.json();
    return data._id;
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
