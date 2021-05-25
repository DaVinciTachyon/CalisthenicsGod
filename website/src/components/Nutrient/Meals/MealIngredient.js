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

  set = () =>
    this.setState({
      weight: this.props.weight,
      isEditing: false,
      fat: this.props.macronutrients.fat,
      carbohydrate: this.props.macronutrients.carbohydrate,
      protein: this.props.macronutrients.protein,
      ethanol: this.props.macronutrients.ethanol,
    });

  getCalories = () =>
    ((this.state.fat * this.props.macroDensities.fat +
      this.state.carbohydrate * this.props.macroDensities.carbohydrate +
      this.state.protein * this.props.macroDensities.protein +
      this.state.ethanol * this.props.macroDensities.ethanol) *
      this.state.weight) /
    100;

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredient/edit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: this.props.mealId,
          ingredient: {
            id: this.props.id,
            weight: this.state.weight,
          },
        }),
      }
    );
    await this.setState({ isEditing: false });
    this.props.onUpdate();
  };

  onRemove = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredient/remove`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          ingredientId: this.props.id,
          _id: this.props.mealId,
        }),
      }
    );
    await this.setState({ isEditing: false });
    this.props.onUpdate();
  };

  render() {
    if (this.props.isTitle)
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
          <Text value={this.props.name} readOnly />
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Weight
          name="weight"
          value={this.state.weight}
          readOnly={!this.state.isEditing}
          onChange={this.onChange}
        />
        <Fat value={(this.state.fat * this.state.weight) / 100} readOnly />
        <Carbohydrate
          value={(this.state.carbohydrate * this.state.weight) / 100}
          readOnly
        />
        <Protein
          value={(this.state.protein * this.state.weight) / 100}
          readOnly
        />
        <Ethanol
          value={(this.state.ethanol * this.state.weight) / 100}
          readOnly
        />
        <Column>
          {!this.state.isEditing && (
            <>
              <Button onClick={() => this.setState({ isEditing: true })}>
                Edit
              </Button>
              <DeleteButton onClick={this.onRemove}>Remove</DeleteButton>
            </>
          )}
          {this.state.isEditing && (
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
