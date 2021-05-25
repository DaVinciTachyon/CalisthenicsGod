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

export default class IngredientRow extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      weight: 100,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      name: '',
    };
  }

  componentDidMount() {
    if (!this.props.isTitle) this.setMacros();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && !this.props.isTitle) this.setMacros();
  }

  getCalories = () =>
    ((this.state.fat * this.props.macroDensities.fat +
      this.state.carbohydrate * this.props.macroDensities.carbohydrate +
      this.state.protein * this.props.macroDensities.protein +
      this.state.ethanol * this.props.macroDensities.ethanol) *
      this.state.weight) /
    100;

  setMacros = () =>
    this.setState({
      name: this.props.name,
      fat: this.props.macronutrients.fat,
      carbohydrate: this.props.macronutrients.carbohydrate,
      protein: this.props.macronutrients.protein,
      ethanol: this.props.macronutrients.ethanol,
    });

  onChangeAvailability = async () => {
    let url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/makeAvailable/`;
    if (this.props.isAvailable)
      url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/makeUnavailable/`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: this.props.id,
      }),
    });
    if (response.status === 200) {
      await this.props.onUpdate();
      this.setState({ isEditing: false });
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/ingredients/edit/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: this.props.id,
          name: this.state.name,
          macronutrients: {
            fat: this.state.fat,
            carbohydrate: this.state.carbohydrate,
            protein: this.state.protein,
            ethanol: this.state.ethanol,
          },
        }),
      }
    );
    if (response.status === 200) {
      await this.props.onUpdate();
      this.setState({ isEditing: false });
    } else {
      const data = await response.json();
      console.error(data.error);
    }
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
          <Text
            name="name"
            onChange={this.onChange}
            value={this.state.name}
            readOnly={!this.state.isEditing}
          />
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Weight value={this.state.weight} readOnly />
        <Fat
          name="fat"
          onChange={this.onChange}
          value={this.state.fat}
          readOnly={!this.state.isEditing}
        />
        <Carbohydrate
          name="carbohydrate"
          onChange={this.onChange}
          value={this.state.carbohydrate}
          readOnly={!this.state.isEditing}
        />
        <Protein
          name="protein"
          onChange={this.onChange}
          value={this.state.protein}
          readOnly={!this.state.isEditing}
        />
        <Ethanol
          name="ethanol"
          onChange={this.onChange}
          value={this.state.ethanol}
          readOnly={!this.state.isEditing}
        />
        {!this.state.isEditing && (
          <div>
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            {this.props.isAvailable && (
              <DeleteButton onClick={this.onChangeAvailability}>
                Unavailable
              </DeleteButton>
            )}
            {!this.props.isAvailable && (
              <SuccessButton onClick={this.onChangeAvailability}>
                Available
              </SuccessButton>
            )}
          </div>
        )}
        {this.state.isEditing && (
          <div>
            <SuccessButton className="primary" onClick={this.onSubmit}>
              Submit
            </SuccessButton>
            <ErrorButton
              onClick={() => {
                this.setMacros();
                this.setState({ isEditing: false });
              }}
            >
              Cancel
            </ErrorButton>
          </div>
        )}
      </Row>
    );
  }
}
