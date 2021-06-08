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
      if (err.response.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  render() {
    const { isUnavailable, onUpdate } = this.props;
    const { ingredients } = this.state;
    if (ingredients.length === 0 && isUnavailable) return <></>;
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <IngredientRow isTitle />
        {!isUnavailable && <IngredientAdder onSubmit={onUpdate} />}
        {ingredients.map(({ _id, name, macronutrients }) => (
          <IngredientRow
            key={_id}
            id={_id}
            name={name}
            macronutrients={macronutrients}
            onUpdate={onUpdate}
            isAvailable={!isUnavailable}
          />
        ))}
      </div>
    );
  }
}
