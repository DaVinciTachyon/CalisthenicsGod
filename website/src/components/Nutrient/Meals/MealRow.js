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

  getCalories = () => {
    const { fat, carbohydrate, protein, ethanol } = this.state;
    const { macroDensities } = this.props;
    return (
      fat * macroDensities.fat +
      carbohydrate * macroDensities.carbohydrate +
      protein * macroDensities.protein +
      ethanol * macroDensities.ethanol
    );
  };

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
    await fetch(`${process.env.REACT_APP_API_URL}/nutrition/meals/preset/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ _id: this.props.id }),
    });
    this.props.onUpdate();
  };

  onSubmit = () => {
    //TODO submit name and submit all unsubmitted ingredients
    this.props.onUpdate();
    this.set();
  };

  setMacros = () => {
    let fat = 0;
    let carbohydrate = 0;
    let protein = 0;
    let ethanol = 0;
    this.state.ingredients.forEach((ingredient) => {
      fat += (ingredient.weight * ingredient.macronutrients.fat) / 100;
      carbohydrate +=
        (ingredient.weight * ingredient.macronutrients.carbohydrate) / 100;
      protein += (ingredient.weight * ingredient.macronutrients.protein) / 100;
      ethanol += (ingredient.weight * ingredient.macronutrients.ethanol) / 100;
    });
    this.setState({ fat, carbohydrate, protein, ethanol });
  };

  render() {
    const { isTitle, id, macroDensities } = this.props;
    const {
      isEditing,
      ingredients,
      name,
      fat,
      carbohydrate,
      protein,
      ethanol,
    } = this.state;
    if (isTitle)
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
          <Calories value={this.getCalories()} readOnly />
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
                <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
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
        {isEditing && (
          <MealEditor
            id={id}
            ingredients={ingredients}
            onUpdate={this.getIngredients}
            macroDensities={macroDensities}
          />
        )}
      </div>
    );
  }
}
