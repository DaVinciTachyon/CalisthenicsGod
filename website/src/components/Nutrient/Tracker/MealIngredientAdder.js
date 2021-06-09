import React from 'react';
import IngredientSelect from '../IngredientSelect';
import { Row, Column } from '../../../style/table';
import { Text, Calories } from '../../../style/inputs';
import { SuccessButton, ErrorButton } from '../../../style/buttons';
import IngredientMacroRow from './IngredientMacroRow';
import { getCalories } from '../util';
import { connect } from 'react-redux';
import { addIngredient } from '../../../stateManagement/reducers/ingredients';
import { addIngredient as addPresetMealIngredient } from '../../../stateManagement/reducers/presetMeals';

class MealIngredientAdder extends React.Component {
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

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    if (this.props.isPreset)
      this.props.addPresetMealIngredient({
        _id: this.props.id,
        ingredient: {
          id: this.state.id || undefined,
          weight: this.state.weight,
          name: this.state.name,
          macronutrients: {
            fat: this.state.fat,
            carbohydrate: this.state.carbohydrate,
            protein: this.state.protein,
            ethanol: this.state.ethanol,
          },
        },
      });
    // let url = '/nutrition/meals/'; TODO
    this.props.onSubmit();
  };

  onCancel = () => this.props.onCancel();

  render() {
    const { id, name, fat, carbohydrate, protein, ethanol, weight } =
      this.state;
    return (
      <Row columns={11} className="input">
        <Column span={2}>
          <IngredientSelect
            value={id}
            onChange={this.onIngredientChange}
            label="Ingredient"
          />
          {id === '' && (
            <Text name="name" value={name} onChange={this.onChange} />
          )}
        </Column>
        <Calories
          value={getCalories(fat, carbohydrate, protein, ethanol, weight)}
          readOnly
        />
        <Column span={7}>
          <IngredientMacroRow isTitle />
          <IngredientMacroRow
            name="Net Weight"
            onChange={({ weight }) => this.setState({ weight })}
            weight={weight}
            fat={(fat * weight) / 100}
            carbohydrate={(carbohydrate * weight) / 100}
            protein={(protein * weight) / 100}
            ethanol={(ethanol * weight) / 100}
          />
          <IngredientMacroRow
            name="Base Weight"
            onChange={({ fat, carbohydrate, protein, ethanol }) =>
              this.setState({ fat, carbohydrate, protein, ethanol })
            }
            isBaseline
            macroReadOnly={id !== ''}
            weight={100}
            fat={fat}
            carbohydrate={carbohydrate}
            protein={protein}
            ethanol={ethanol}
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

export default connect(({ ingredients }) => ({ ingredients }), {
  addIngredient,
  addPresetMealIngredient,
})(MealIngredientAdder);
