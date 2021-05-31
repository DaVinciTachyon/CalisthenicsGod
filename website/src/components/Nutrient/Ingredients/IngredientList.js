import React from 'react';
import IngredientRow from './IngredientRow';
import { Title } from '../../../style/table';
import IngredientAdder from './IngredientAdder';

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
    let url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/`;
    if (this.props.isUnavailable)
      url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/unavailable/`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const { ingredients } = await response.json();
    this.setState({ ingredients });
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
