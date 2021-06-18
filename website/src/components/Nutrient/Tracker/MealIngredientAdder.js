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
import { addIngredient as addMealIngredient } from '../../../stateManagement/reducers/meals';

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
      calories: 0,
    };
  }

  onIngredientChange = async (ingredient) => {
    if (ingredient === undefined)
      this.setState({
        id: '',
        name: '',
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
        calories: 0,
      });
    else {
      this.setState({
        id: ingredient._id,
        name: ingredient.name,
        fat: ingredient.macronutrients.fat,
        carbohydrate: ingredient.macronutrients.carbohydrate,
        protein: ingredient.macronutrients.protein,
        ethanol: ingredient.macronutrients.ethanol,
        calories: await getCalories(
          ingredient.macronutrients.fat,
          ingredient.macronutrients.carbohydrate,
          ingredient.macronutrients.protein,
          ingredient.macronutrients.ethanol,
          this.state.weight
        ),
      });
    }
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    // if (!this.state.id)
    //   this.props.addIngredient({
    //     name: this.state.name,
    //     macronutrients: {
    //       fat: this.state.fat,
    //       carbohydrate: this.state.carbohydrate,
    //       protein: this.state.protein,
    //       ethanol: this.state.ethanol,
    //     },
    //   });
    const ingredient = {
      _id: this.props.id,
      ingredient: {
        id: this.state.id,
        // || this.props.ingredients.find(
        //   (ingredient) => ingredient.name === this.state.name
        // )._id
        weight: this.state.weight,
      },
    };
    if (this.props.isPreset) this.props.addPresetMealIngredient(ingredient);
    this.props.addMealIngredient(ingredient);
    this.props.onSubmit();
  };

  render() {
    const { id, name, fat, carbohydrate, protein, ethanol, weight, calories } =
      this.state;
    return (
      <Row columns={11} className="input">
        <Column span={2}>
          <IngredientSelect
            value={id}
            onChange={this.onIngredientChange}
            label="Ingredient"
          />
          {/* {id === '' && (
            <Text name="name" value={name} onChange={this.onChange} />
          )} */}
        </Column>
        <Calories value={calories} readOnly />
        <Column span={7}>
          <IngredientMacroRow isTitle />
          <IngredientMacroRow
            name="Net Weight"
            onChange={async ({ weight }) =>
              this.setState({
                weight,
                calories: await getCalories(
                  this.state.fat,
                  this.state.carbohydrate,
                  this.state.protein,
                  this.state.ethanol,
                  weight
                ),
              })
            }
            weight={weight}
            fat={(fat * weight) / 100}
            carbohydrate={(carbohydrate * weight) / 100}
            protein={(protein * weight) / 100}
            ethanol={(ethanol * weight) / 100}
          />
          <IngredientMacroRow
            name="Base Weight"
            onChange={async ({ fat, carbohydrate, protein, ethanol }) =>
              this.setState({
                fat,
                carbohydrate,
                protein,
                ethanol,
                calories: await getCalories(
                  fat,
                  carbohydrate,
                  protein,
                  ethanol,
                  this.state.weight
                ),
              })
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
          <ErrorButton onClick={this.props.onCancel}>Cancel</ErrorButton>
        </Column>
      </Row>
    );
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  addIngredient,
  addPresetMealIngredient,
  addMealIngredient,
})(MealIngredientAdder);
