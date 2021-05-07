import React from 'react';
import IngredientRow from './IngredientRow';
import { Row, Column, Subtitle } from '../../style/table';

export default class NutrientSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      macros: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
    };
  }

  componentDidMount() {
    this.getUserGoals();
  }

  render() {
    return (
      <div>
        <Row columns={7} isTitle>
          <Column span={2} />
          <Column>
            <div>Calories</div>
            <Subtitle>kcal</Subtitle>
          </Column>
          <Column>
            <div>Fat</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Carbs</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Protein</div>
            <Subtitle>grams</Subtitle>
          </Column>
          <Column>
            <div>Ethanol</div>
            <Subtitle>grams</Subtitle>
          </Column>
        </Row>
        <IngredientRow
          key={'goal'}
          ingredient={{
            name: 'Goal',
            fat: this.state.macros.fat,
            carbohydrate: this.state.macros.carbohydrate,
            protein: this.state.macros.protein,
            ethanol: this.state.macros.ethanol,
          }}
          macroDensities={this.props.macroDensities}
          isSummary={true}
        />
        <IngredientRow
          key={'current'}
          ingredient={{
            name: 'Current',
            fat: this.props.currentMacros.fat,
            carbohydrate: this.props.currentMacros.carbohydrate,
            protein: this.props.currentMacros.protein,
            ethanol: this.props.currentMacros.ethanol,
          }}
          macroDensities={this.props.macroDensities}
          isSummary={true}
        />
        <IngredientRow
          key={'left'}
          ingredient={{
            name: 'Left',
            fat: this.state.macros.fat - this.props.currentMacros.fat,
            carbohydrate:
              this.state.macros.carbohydrate -
              this.props.currentMacros.carbohydrate,
            protein:
              this.state.macros.protein - this.props.currentMacros.protein,
            ethanol:
              this.state.macros.ethanol - this.props.currentMacros.ethanol,
          }}
          macroDensities={this.props.macroDensities}
          isSummary={true}
        />
      </div>
    );
  }

  getUserGoals = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/nutrition/goals`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          macros: data,
        })
      );
  };
}
