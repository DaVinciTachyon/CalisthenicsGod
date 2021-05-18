import React from 'react';
import { Select } from '../../../style/inputs';
import { Button } from '../../../style/buttons';
import { Row } from '../../../style/table';

export default class MealSelect extends React.Component {
  constructor() {
    super();
    this.state = { meals: [], id: '' };
  }

  componentDidMount() {
    this.getMeals();
  }

  render() {
    return (
      <Row columns={2}>
        <Select
          options={[{ label: 'New Meal', value: '' }].concat(this.state.meals)}
          defaultValue={''}
          onChange={(evt) => this.setState({ id: evt.value })}
        />
        <Button onClick={() => this.props.onSubmit(this.state.id)}>
          Select
        </Button>
      </Row>
    );
  }

  getMeals = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/names/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    const meals = [];
    data.meals.forEach((meal) =>
      meals.push({ label: meal.name, value: meal._id })
    );
    this.setState({ meals });
  };
}
