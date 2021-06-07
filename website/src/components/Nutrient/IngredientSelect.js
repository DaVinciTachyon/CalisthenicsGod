import React from 'react';
import { Select } from '../../style/inputs';
import axios from 'axios';

export default class IngredientSelect extends React.Component {
  constructor() {
    super();
    this.state = { ingredients: [] };
  }

  componentDidMount() {
    this.getIngredients();
  }

  onChange = (evt) =>
    this.props.onChange(
      this.state.ingredients.filter(
        (ingredient) => evt.value === ingredient._id
      )[0]
    );

  render() {
    const { name, onChange, ...rest } = this.props;
    return (
      <Select
        name={name || 'ingredient'}
        options={[{ label: 'New Ingredient', value: '' }].concat(
          this.state.ingredients.map((ingredient) => {
            return { label: ingredient.name, value: ingredient._id };
          })
        )}
        onChange={this.onChange}
        {...rest}
      />
    );
  }

  getIngredients = async () => {
    try {
      const { ingredients } = (await axios.get('/nutrition/ingredients/')).data;
      this.setState({ ingredients });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };
}
