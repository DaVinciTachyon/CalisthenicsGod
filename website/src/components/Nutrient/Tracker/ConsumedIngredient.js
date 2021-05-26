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
    const { mealId, _id } = this.props;
    const { weight } = this.state;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/edit/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: mealId,
          ingredient: {
            _id,
            weight,
          },
        }),
      }
    );
    this.onUpdate(response);
  };

  onRemove = async () => {
    const { mealId, _id } = this.props;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/remove/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: mealId,
          ingredientId: _id,
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

  getCalories = () => {
    const { fat, carbohydrate, protein, ethanol, weight, macroDensities } =
      this.props;
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

  render() {
    const { isTitle, name, macros } = this.props;
    const { isEditing, weight } = this.state;
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
          value={weight}
          readOnly={!isEditing}
          name="weight"
          onChange={this.onChange}
        />
        <Fat value={(macros.fat * weight) / 100} readOnly />
        <Carbohydrate value={(macros.carbohydrate * weight) / 100} readOnly />
        <Protein value={(macros.protein * weight) / 100} readOnly />
        <Ethanol value={(macros.ethanol * weight) / 100} readOnly />
        <Column>
          {!isEditing && (
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
          {isEditing && (
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
