import React from 'react';
import { Row, Column, Subtitle } from '../../../style/table';
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
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.set();
  }

  set = () =>
    this.setState({
      weight: this.props.weight,
      isEditing: false,
      fat: this.props.fat,
      carbohydrate: this.props.carbohydrate,
      protein: this.props.protein,
      ethanol: this.props.ethanol,
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
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/editIngredient/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          ingredientId: this.props.id,
          _id: this.props.mealId,
          weight: this.state.weight,
        }),
      }
    );
    await this.setState({ isEditing: false });
    this.props.onUpdate();
  };

  onRemove = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/removeIngredient/`,
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
          <Column>
            <div>Calories</div>
            <Subtitle>kcal</Subtitle>
          </Column>
          <Column>
            <div>Weight</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Fat</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Carbs</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Protein</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Ethanol</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column />
        </Row>
      );
    return (
      <Row columns={9}>
        <Column span={2}>
          <Text value={this.props.name} readOnly />
        </Column>
        <Column>
          <Calories value={this.getCalories()} readOnly />
        </Column>
        <Column>
          <Weight
            name="weight"
            value={this.state.weight}
            readOnly={!this.state.isEditing}
            onChange={this.onChange}
          />
        </Column>
        <Column>
          <Fat value={(this.state.fat * this.state.weight) / 100} readOnly />
        </Column>
        <Column>
          <Carbohydrate
            value={(this.state.carbohydrate * this.state.weight) / 100}
            readOnly
          />
        </Column>
        <Column>
          <Protein
            value={(this.state.protein * this.state.weight) / 100}
            readOnly
          />
        </Column>
        <Column>
          <Ethanol
            value={(this.state.ethanol * this.state.weight) / 100}
            readOnly
          />
        </Column>
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
