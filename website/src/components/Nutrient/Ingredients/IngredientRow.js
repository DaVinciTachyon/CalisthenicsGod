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
import axios from 'axios';

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

  setMacros = () => {
    const { name, macronutrients } = this.props;
    const { fat, carbohydrate, protein, ethanol } = macronutrients;
    this.setState({
      name,
      fat,
      carbohydrate,
      protein,
      ethanol,
    });
  };

  onChangeAvailability = async () => {
    const { isAvailable, id, onUpdate } = this.props;
    let url = `/nutrition/ingredients/unavailable/`;
    if (isAvailable) url = `/nutrition/ingredients/`;
    await axios.delete(url, {
      _id: id,
    });
    await onUpdate();
    this.setState({ isEditing: false });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  onSubmit = async () => {
    const { id, onUpdate } = this.props;
    const { name, fat, carbohydrate, protein, ethanol } = this.state;
    await axios.patch('/nutrition/ingredients/', {
      _id: id,
      name,
      macronutrients: {
        fat,
        carbohydrate,
        protein,
        ethanol,
      },
    });
    await onUpdate();
    this.setState({ isEditing: false });
  };

  render() {
    const { isTitle, isAvailable } = this.props;
    const { isEditing, name, weight, fat, carbohydrate, protein, ethanol } =
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
          <Text
            name="name"
            onChange={this.onChange}
            value={name}
            readOnly={!isEditing}
          />
        </Column>
        <Calories value={this.getCalories()} readOnly />
        <Weight value={weight} readOnly />
        <Fat
          name="fat"
          onChange={this.onChange}
          value={fat}
          readOnly={!isEditing}
        />
        <Carbohydrate
          name="carbohydrate"
          onChange={this.onChange}
          value={carbohydrate}
          readOnly={!isEditing}
        />
        <Protein
          name="protein"
          onChange={this.onChange}
          value={protein}
          readOnly={!isEditing}
        />
        <Ethanol
          name="ethanol"
          onChange={this.onChange}
          value={ethanol}
          readOnly={!isEditing}
        />
        {!isEditing && (
          <div>
            <Button onClick={() => this.setState({ isEditing: true })}>
              Edit
            </Button>
            {isAvailable && (
              <DeleteButton onClick={this.onChangeAvailability}>
                Unavailable
              </DeleteButton>
            )}
            {!isAvailable && (
              <SuccessButton onClick={this.onChangeAvailability}>
                Available
              </SuccessButton>
            )}
          </div>
        )}
        {isEditing && (
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
