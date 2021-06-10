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

export default class MealIngredient extends React.Component {
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

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    const { mealId, id, onUpdate } = this.props;
    const { weight } = this.state;
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredient/`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: mealId,
          ingredient: {
            id,
            weight,
          },
        }),
      }
    );
    await this.setState({ isEditing: false });
    onUpdate();
  };

  onRemove = async () => {
    const { mealId, id, onUpdate } = this.props;
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredient/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          ingredient: { _id: id },
          _id: mealId,
        }),
      }
    );
    await this.setState({ isEditing: false });
    onUpdate();
  };

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
              <DeleteButton onClick={this.onRemove}>Remove</DeleteButton>
            </>
          )}
          {isEditing && (
            <>
              <SuccessButton onClick={this.onSubmit}>Submit</SuccessButton>
              <ErrorButton onClick={this.set}>Cancel</ErrorButton>
            </>
          )}
        </Column>
      </Row>
    );
  }
}
