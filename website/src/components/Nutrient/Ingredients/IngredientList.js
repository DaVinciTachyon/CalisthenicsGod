import React from 'react';
import IngredientRow from './IngredientRow';
import { Title } from '../../../style/table';
import IngredientAdder from './IngredientAdder';
import { connect } from 'react-redux';
import { setIngredients } from '../../../stateManagement/reducers/ingredients';

class IngredientList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.ingredients.available.length === 0)
      this.props.setIngredients();
  }

  render() {
    const { isUnavailable, ingredients } = this.props;
    if (isUnavailable && ingredients.unavailable.length === 0) return <></>;
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <IngredientRow isTitle />
        {!isUnavailable && <IngredientAdder />}
        {(isUnavailable ? ingredients.unavailable : ingredients.available).map(
          ({ _id, name, macronutrients }) => (
            <IngredientRow
              key={_id}
              id={_id}
              name={name}
              macronutrients={macronutrients}
              isAvailable={!isUnavailable}
            />
          )
        )}
      </div>
    );
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {
  setIngredients,
})(IngredientList);
