import React from 'react';
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
import {
  Button,
  SuccessButton,
  ErrorButton,
  DeleteButton,
} from '../../../style/buttons';
import { getCalories } from '../util';
import {
  removeIngredient,
  modifyIngredient,
} from '../../../stateManagement/reducers/presetMeals';
import { connect } from 'react-redux';

class MealIngredient extends React.Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      isEditing: false,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    };
  }

  componentDidMount() {
    if (!this.props.isTitle) this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.props.isTitle) this.set();
  }

  set = () => {
    const { weight, macronutrients } = this.props;
    const { fat, carbohydrate, protein, ethanol } = macronutrients;
    this.setState({
      weight,
      isEditing: false,
      fat,
      carbohydrate,
      protein,
      ethanol,
    });
  };

  getCalories = () => {
    const { fat, carbohydrate, protein, ethanol, weight } = this.state;
    return getCalories(fat, carbohydrate, protein, ethanol, weight);
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    const { isTitle, name } = this.props;
    const { isEditing, weight, fat, carbohydrate, protein, ethanol } =
      this.state;
    if (isTitle)
      return (
        <Row columns={9} isTitle>
          <Column span={2} />
          <Column>Calories</Column>
          <Column>Weight</Column>
          <Column>Fat</Column>
          <Column>Carbs</Column>
          <Column>Protein</Column>
          <Column>Ethanol</Column>
          <Column />
        </Row>
      );
    return (
      <Row columns={9}>
        <Column span={2}>
          <Text value={name} readOnly />
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Weight
          name="weight"
          value={weight}
          readOnly={!isEditing}
          onChange={this.onChange}
        />
        <Fat value={(fat * weight) / 100} readOnly />
        <Carbohydrate value={(carbohydrate * weight) / 100} readOnly />
        <Protein value={(protein * weight) / 100} readOnly />
        <Ethanol value={(ethanol * weight) / 100} readOnly />
        <Column>
          {!isEditing && (
            <>
              <Button onClick={() => this.setState({ isEditing: true })}>
                Edit
              </Button>
              <DeleteButton
                onClick={() =>
                  this.props.removeIngredient({
                    _id: this.props.mealId,
                    ingredient: { _id: this.props.id },
                  })
                }
              >
                Remove
              </DeleteButton>
            </>
          )}
          {isEditing && (
            <>
              <SuccessButton
                onClick={() => {
                  this.props.modifyIngredient({
                    _id: this.props.mealId,
                    ingredient: {
                      _id: this.props.id,
                      weight: this.state.weight,
                    },
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
    );
  }
}

export default connect(() => ({}), {
  removeIngredient,
  modifyIngredient,
})(MealIngredient);
