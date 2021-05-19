import React from 'react';
import { Select } from '../../style/inputs';

export default class IngredientSelect extends React.Component {
  constructor() {
    super();
    this.state = { ingredients: [] };
  }

  componentDidMount() {
    this.getIngredients();
  }

  onChange = (evt) => {
    this.props.onChange(
      this.state.ingredients.filter(
        (ingredient) => evt.value === ingredient._id
      )[0]
    );
  };

  render() {
    return (
      <Select
        name={this.props.name || 'ingredient'}
        options={[{ label: 'New Ingredient', value: '' }].concat(
          this.state.ingredients.map((ingredient) => {
            return { label: ingredient.name, value: ingredient._id };
          })
        )}
        defaultValue={''}
        onChange={this.onChange}
        readOnly={this.props.readOnly}
      />
    );
  }

  getIngredients = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/ingredients/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
      }
    );
    const data = await response.json();
    this.setState({ ingredients: data.ingredients });
  };
}
