import React from 'react';
import { Select } from '../../style/inputs';
import { Button } from '../../style/buttons';
import { Row } from '../../style/table';
import axios from 'axios';

export default class MealSelect extends React.Component {
  constructor() {
    super();
    this.state = { meals: [], id: '' };
  }

  componentDidMount() {
    this.getMeals();
  }

  render() {
    const { value, onChange, onSubmit, ...rest } = this.props;
    return (
      <Row columns={2}>
        <Select
          options={[{ label: 'New Meal', value: '' }].concat(this.state.meals)}
          value={this.state.id}
          onChange={(evt) => this.setState({ id: evt.value })}
          {...rest}
        />
        <Button onClick={() => onSubmit(this.state.id)}>Select</Button>
      </Row>
    );
  }

  getMeals = async () => {
    const data = (await axios.get('/nutrition/meals/preset/names/')).data;
    const meals = [];
    data.meals.forEach((meal) =>
      meals.push({ label: meal.name, value: meal._id })
    );
    this.setState({ meals });
  };
}
