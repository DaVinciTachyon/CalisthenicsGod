import React from 'react';
import { Button, ErrorButton } from '../../../style/buttons';
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
import { getCalories } from '../util';
import { addIngredient } from '../../../stateManagement/reducers/ingredients';
import { connect } from 'react-redux';

class IngredientAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
      name: '',
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      weight: 100,
      calories: 0,
    };
  }

  onSubmit = () => {
    this.props.addIngredient({
      name: this.state.name,
      macronutrients: {
        fat: this.state.fat,
        carbohydrate: this.state.carbohydrate,
        protein: this.state.protein,
        ethanol: this.state.ethanol,
      },
    });
    this.reset();
  };

  reset = () =>
    this.setState({
      isAdding: false,
      name: '',
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
      calories: 0,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.setState({
      calories: await getCalories(
        this.state.fat,
        this.state.carbohydrate,
        this.state.protein,
        this.state.ethanol,
        this.state.weight
      ),
    });
  };

  render() {
    if (!this.state.isAdding)
      return (
        <Button
          className="maxWidth thin"
          onClick={() => this.setState({ isAdding: true })}
        >
          Add
        </Button>
      );
    const { name, fat, carbohydrate, protein, ethanol, weight, calories } =
      this.state;
    return (
      <Row columns={9} className="input">
        <Column span={2}>
          <Text name="name" onChange={this.onChange} value={name} />
        </Column>
        <Calories value={calories} readOnly />
        <Weight value={weight} readOnly />
        <Fat name="fat" onChange={this.onChange} value={fat} />
        <Carbohydrate
          name="carbohydrate"
          onChange={this.onChange}
          value={carbohydrate}
        />
        <Protein name="protein" onChange={this.onChange} value={protein} />
        <Ethanol name="ethanol" onChange={this.onChange} value={ethanol} />
        <Column>
          <Button onClick={this.onSubmit}>Submit</Button>
          <ErrorButton onClick={this.resetState}>Cancel</ErrorButton>
        </Column>
      </Row>
    );
  }
}

export default connect(() => ({}), {
  addIngredient,
})(IngredientAdder);
