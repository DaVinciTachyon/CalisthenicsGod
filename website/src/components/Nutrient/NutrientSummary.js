import React from 'react';
import IngredientRow from './IngredientRow';
import './Main.css';

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
      showModal: false,
    };
  }

  componentDidMount() {
    this.getUserGoals();
  }

  render() {
    return (
      <div className="calorieSummary">
        <div className="row">
          <div className="name-column column"></div>
          <div className="calories-column column">
            <div className="title">Calories</div>
            <div className="subtitle">kcal</div>
          </div>
          <div className="fat-column column">
            <div className="title">Fat</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="carbohydrate-column column">
            <div className="title">Carbs</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="protein-column column">
            <div className="title">Protein</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="ethanol-column column">
            <div className="title">Ethanol</div>
            <div className="subtitle">grams</div>
          </div>
        </div>
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
