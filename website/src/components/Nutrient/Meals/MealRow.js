import React from 'react';
import { Row, Column, Subtitle } from '../../../style/table';
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

export default class MealRow extends React.Component {
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
    };
  }

  componentDidMount() {
    if (!this.props.isTitle) {
      this.set();
      this.getIngredients();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.props.isTitle) {
      this.set();
      this.getIngredients();
    }
  }

  set = () => this.setState({ name: this.props.name, isEditing: false });

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  getCalories = () =>
    this.state.fat * this.props.macroDensities.fat +
    this.state.carbohydrate * this.props.macroDensities.carbohydrate +
    this.state.protein * this.props.macroDensities.protein +
    this.state.ethanol * this.props.macroDensities.ethanol;

  getIngredients = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/ingredients/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ _id: this.props.id }),
      }
    );
    const data = await response.json();
    await this.setState({ ingredients: data.ingredients });
    this.setMacros();
  };

  onDelete = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/remove/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ _id: this.props.id }),
      }
    );
    this.props.onUpdate();
  };

  onSubmit = () => {
    //TODO submit name
    //TODO submit all unsubmitted ingredients
    this.props.onUpdate();
    this.set();
  };

  setMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.state.ingredients.forEach((ingredient) => {
      fat += (ingredient.weight * ingredient.fat) / 100;
      carbohydrate += (ingredient.weight * ingredient.carbohydrate) / 100;
      protein += (ingredient.weight * ingredient.protein) / 100;
      ethanol += (ingredient.weight * ingredient.ethanol) / 100;
    });
    this.setState({ fat, carbohydrate, protein, ethanol });
  };

  render() {
    if (this.props.isTitle)
      return (
        <Row columns={8} isTitle>
          <Column span={2} />
          <Column>
            <div>Calories</div>
            <Subtitle>kcal</Subtitle>
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
      <div>
        <Row columns={8}>
          <Column span={2}>
            <Text
              name="name"
              value={this.state.name}
              readOnly={!this.state.isEditing}
              onChange={this.onChange}
            />
          </Column>
          <Column>
            <Calories value={this.getCalories()} readOnly />
          </Column>
          <Column>
            <Fat value={this.state.fat} readOnly />
          </Column>
          <Column>
            <Carbohydrate value={this.state.carbohydrate} readOnly />
          </Column>
          <Column>
            <Protein value={this.state.protein} readOnly />
          </Column>
          <Column>
            <Ethanol value={this.state.ethanol} readOnly />
          </Column>
          <Column>
            {!this.state.isEditing && (
              <>
                <Button onClick={() => this.setState({ isEditing: true })}>
                  Edit
                </Button>
                <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
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
        {this.state.isEditing && (
          <MealEditor
            id={this.props.id}
            ingredients={this.state.ingredients}
            onUpdate={this.getIngredients}
            macroDensities={this.props.macroDensities}
          />
        )}
      </div>
    );
  }
}
