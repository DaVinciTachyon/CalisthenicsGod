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
import {
  Button,
  DeleteButton,
  SuccessButton,
  ErrorButton,
} from '../../../style/buttons';
import MealEditor from './MealEditor';
import { getCalories } from '../util';
import { setIngredients } from '../../../stateManagement/reducers/ingredients';
import {
  deletePresetMeal,
  modifyPresetMeal,
} from '../../../stateManagement/reducers/presetMeals';
import { connect } from 'react-redux';

class MealRow extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      name: '',
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      ingredients: [],
      calories: 0,
    };
  }

  componentDidMount() {
    if (!this.props.isTitle) this.set();
    if (this.props.ingredients.available.length === 0)
      this.props.setIngredients();
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.meal !== this.props.meal ||
        prevProps.ingredients.available !== this.props.ingredients.available ||
        prevProps.ingredients.unavailable !==
          this.props.ingredients.unavailable) &&
      !this.props.isTitle
    )
      this.set();
  }

  set = async () => {
    const ingredients = this.props.meal.ingredients.map((ingredient) => {
      const ing =
        this.props.ingredients.available.find(
          (ing) => ing._id === ingredient.id
        ) ||
        this.props.ingredients.unavailable.find(
          (ing) => ing._id === ingredient.id
        );
      return {
        ...ingredient,
        name: ing?.name || '',
        macronutrients: ing?.macronutrients || {
          fat: 0,
          carbohydrate: 0,
          protein: 0,
          ethanol: 0,
        },
      };
    });
    let fat = 0,
      carbohydrate = 0,
      protein = 0,
      ethanol = 0;
    ingredients.forEach(({ weight, macronutrients }) => {
      fat += (weight * macronutrients.fat) / 100;
      carbohydrate += (weight * macronutrients.carbohydrate) / 100;
      protein += (weight * macronutrients.protein) / 100;
      ethanol += (weight * macronutrients.ethanol) / 100;
    });
    const calories = await getCalories(fat, carbohydrate, protein, ethanol);
    this.setState({
      name: this.props.meal.name,
      ingredients,
      fat,
      carbohydrate,
      protein,
      ethanol,
      isEditing: false,
      calories,
    });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={8} isTitle>
          <Column span={2} />
          <Column>Calories</Column>
          <Column>Fat</Column>
          <Column>Carbs</Column>
          <Column>Protein</Column>
          <Column>Ethanol</Column>
          <Column />
        </Row>
      );
    const { isEditing, name, fat, carbohydrate, protein, ethanol, calories } =
      this.state;
    return (
      <div>
        <Row columns={8}>
          <Column span={2}>
            <Text
              name="name"
              value={name}
              readOnly={!isEditing}
              onChange={this.onChange}
            />
          </Column>
          <Calories value={calories} readOnly />
          <Fat value={fat} readOnly />
          <Carbohydrate value={carbohydrate} readOnly />
          <Protein value={protein} readOnly />
          <Ethanol value={ethanol} readOnly />
          <Column>
            {!isEditing && (
              <>
                <Button onClick={() => this.setState({ isEditing: true })}>
                  Edit
                </Button>
                <DeleteButton
                  onClick={() =>
                    this.props.deletePresetMeal(this.props.meal._id)
                  }
                >
                  Delete
                </DeleteButton>
              </>
            )}
            {isEditing && (
              <>
                <SuccessButton
                  onClick={() => {
                    this.props.modifyPresetMeal({
                      _id: this.props.meal._id,
                      name: this.state.name,
                    });
                    this.set();
                  }}
                >
                  Submit
                </SuccessButton>
                <ErrorButton onClick={this.set}>Cancel</ErrorButton>
              </>
            )}
          </Column>
        </Row>
        {isEditing && (
          <MealEditor
            id={this.props.meal._id}
            ingredients={this.state.ingredients}
          />
        )}
      </div>
    );
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  setIngredients,
  deletePresetMeal,
  modifyPresetMeal,
})(MealRow);
