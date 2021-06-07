import React from 'react';
import IngredientRow from './IngredientRow';
import { Title } from '../../../style/table';
import IngredientAdder from './IngredientAdder';
import axios from 'axios';

export default class IngredientList extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.getIngredients();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) this.getIngredients();
  }

  getIngredients = async () => {
    try {
      let url = `/nutrition/ingredients/`;
      if (this.props.isUnavailable) url += `unavailable/`;
      const { ingredients } = (await axios.get(url)).data;
      this.setState({ ingredients });
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  render() {
    const { isUnavailable, macroDensities, onUpdate } = this.props;
    const { ingredients } = this.state;
    if (ingredients.length === 0 && isUnavailable) return <></>;
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <IngredientRow isTitle />
        {!isUnavailable && (
          <IngredientAdder
            onSubmit={onUpdate}
            macroDensities={macroDensities}
          />
        )}
        {ingredients.map(({ _id, name, macronutrients }) => (
          <IngredientRow
            key={_id}
            id={_id}
            name={name}
            macronutrients={macronutrients}
            macroDensities={macroDensities}
            onUpdate={onUpdate}
            isAvailable={!isUnavailable}
          />
        ))}
      </div>
    );
  }
}
