import React from 'react';
import IngredientRow from './IngredientRow';
import { Title } from '../../../style/table';
import IngredientAdder from './IngredientAdder';
import { connect } from 'react-redux';
import { getIngredients } from '../../../stateManagement/reducers/ingredients';

class IngredientList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getIngredients();
  }

  render() {
    const { isUnavailable, ingredients } = this.props;
    if (
      isUnavailable &&
      ingredients.filter((ingredient) => !ingredient.isAvailable).length === 0
    )
      return <></>;
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <IngredientRow isTitle />
        {!isUnavailable && <IngredientAdder />}
        {ingredients
          .filter((ingredient) =>
            isUnavailable ? !ingredient.isAvailable : ingredient.isAvailable
          )
          .map(({ _id, name, macronutrients }) => (
            <IngredientRow
              key={_id}
              id={_id}
              name={name}
              macronutrients={macronutrients}
              isAvailable={!isUnavailable}
            />
          ))}
      </div>
    );
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  getIngredients,
})(IngredientList);
