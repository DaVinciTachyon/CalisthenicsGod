import React from 'react';
import IngredientRow from './IngredientRow';
import { Row, Column, Title } from '../../../style/table';
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
      url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/unavailable`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    });
    const data = await response.json();
    this.setState({ ingredients: data.ingredients });
  };

  render() {
    if (this.state.ingredients.length === 0 && this.props.isUnavailable)
      return <></>;
    const ingredients = [];
    this.state.ingredients.forEach((ingredient) =>
      ingredients.push(
        <IngredientRow
          key={ingredient._id}
          id={ingredient._id}
          name={ingredient.name}
          macronutrients={ingredient.macronutrients}
          macroDensities={this.props.macroDensities}
          onUpdate={this.props.onUpdate}
          isAvailable={!this.props.isUnavailable}
        />
      )
    );
    return (
      <div>
        <Row columns={9}>
          <Column span={9}>
            {!this.props.isUnavailable && <Title>Available</Title>}
            {this.props.isUnavailable && <Title>Unavailable</Title>}
          </Column>
        </Row>
        <IngredientRow isTitle />
        {!this.props.isUnavailable && (
          <IngredientAdder
            onSubmit={this.props.onUpdate}
            macroDensities={this.props.macroDensities}
          />
        )}
        {ingredients}
      </div>
    );
  }
}
