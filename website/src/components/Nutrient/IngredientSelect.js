import React from 'react';
import { Select } from '../../style/inputs';
import { connect } from 'react-redux';
import { setIngredients } from '../../stateManagement/reducers/ingredients';

class IngredientSelect extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.ingredients.available.length === 0)
      this.props.setIngredients();
  }

  onChange = (evt) =>
    this.props.onChange(
      this.props.ingredients.available.filter(
        (ingredient) => evt.value === ingredient._id
      )[0]
    );

  render() {
    const { name, onChange, ...rest } = this.props;
    return (
      <Select
        name={name || 'ingredient'}
        options={[{ label: 'New Ingredient', value: '' }].concat(
          this.props.ingredients.available.map((ingredient) => {
            return { label: ingredient.name, value: ingredient._id };
          })
        )}
        onChange={this.onChange}
        {...rest}
      />
    );
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  setIngredients,
})(IngredientSelect);
