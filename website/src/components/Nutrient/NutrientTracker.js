import React from 'react';
import NutrientSummary from './NutrientSummary';
import NutrientDay from './NutrientDay';
import { Card } from '../../style/general';

export default class NutrientTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMacros: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
      macroDensities: {
        fat: 9,
        carbohydrate: 4,
        protein: 4,
        ethanol: 7,
      },
      update: false,
      showIngredients: false,
      showMeals: false,
    };
  }

  async componentDidMount() {
    this.getMacronutrientDensities();
  }

  update = (currentMacros) => {
    if (currentMacros) this.setState({ currentMacros: currentMacros });
    this.setState({ update: !this.state.update });
  };

  render() {
    return (
      <div>
        <Card>
          <NutrientSummary
            currentMacros={this.state.currentMacros}
            macroDensities={this.state.macroDensities}
          />
        </Card>
        <NutrientDay
          macroDensities={this.state.macroDensities}
          updateNutrients={this.update}
        />
      </div>
    );
  }

  showIngredients = () => {
    this.setState({ showIngredients: !this.state.showIngredients });
  };

  showMeals = () => {
    this.setState({ showMeals: !this.state.showMeals });
  };

  getMacronutrientDensities = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/nutrition/macronutrientDensities`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          macroDensities: {
            fat: data.fat,
            carb: data.carbohydrate,
            prot: data.protein,
            eth: data.ethanol,
          },
        })
      );
  };
}
