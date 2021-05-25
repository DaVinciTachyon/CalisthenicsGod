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

export default class ConsumedIngredient extends React.Component {
  constructor() {
    super();
    this.state = { weight: 0, isEditing: false };
  }

  componentDidMount() {
    this.setWeight();
  }

  onSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/edit/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: this.props.mealId,
          ingredient: {
            _id: this.props._id,
            weight: this.state.weight,
          },
        }),
      }
    );
    this.onUpdate(response);
  };

  onRemove = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/remove/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: this.props.mealId,
          ingredientId: this.props._id,
        }),
      }
    );
    this.onUpdate(response);
  };

  onUpdate = async (response) => {
    if (response.status === 200) {
      await this.props.onUpdate();
      this.setState({ isEditing: false });
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  setWeight = () => this.setState({ weight: this.props.weight });

  getCalories = () =>
    ((this.props.macros.fat * this.props.macroDensities.fat +
      this.props.macros.carbohydrate * this.props.macroDensities.carbohydrate +
      this.props.macros.protein * this.props.macroDensities.protein +
      this.props.macros.ethanol * this.props.macroDensities.ethanol) *
      this.state.weight) /
    100;

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    if (this.props.isTitle)
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
          value={this.state.weight}
          readOnly={!this.state.isEditing}
          name="weight"
          onChange={this.onChange}
        />
        <Fat
          value={(this.props.macros.fat * this.state.weight) / 100}
          readOnly
        />
        <Carbohydrate
          value={(this.props.macros.carbohydrate * this.state.weight) / 100}
          readOnly
        />
        <Protein
          value={(this.props.macros.protein * this.state.weight) / 100}
          readOnly
        />
        <Ethanol
          value={(this.props.macros.ethanol * this.state.weight) / 100}
          readOnly
        />
        <Column>
          {!this.state.isEditing && (
            <>
              <Button
                onClick={() => {
                  this.setState({ isEditing: true });
                }}
              >
                Edit
              </Button>
              <DeleteButton onClick={this.onRemove}>Remove</DeleteButton>
            </>
          )}
          {this.state.isEditing && (
            <>
              <SuccessButton onClick={this.onSubmit}>Submit</SuccessButton>
              <ErrorButton
                onClick={() => {
                  this.setState({ isEditing: false });
                  this.setWeight();
                }}
              >
                Cancel
              </ErrorButton>
            </>
          )}
        </Column>
      </Row>
    );
  }
}
