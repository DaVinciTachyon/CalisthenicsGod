import React from 'react';
import IngredientRow from './IngredientRow';
import './Main.css';

export default class MealTable extends React.Component {
  constructor() {
    super();
    this.state = {
      add: false,
      focus: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus) {
      this.setState({ focus: !this.state.focus });
    }
  }

  render() {
    let meal = [];
    let summary = {
      name: 'Total',
      weight: 0,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    };
    for (let i = 0; i < this.props.meal.ingredients.length; i++) {
      meal.push(
        <IngredientRow
          key={this.props.meal.ingredients[i]._id}
          ingredient={this.props.meal.ingredients[i]}
          changeFocus={this.changeFocus}
          focus={this.state.focus}
          onSubmit={this.editIngredient}
          submitStatus={this.removeIngredient}
          mealId={this.props.meal._id}
          hasWeight={true}
        />
      );
      const weight = this.props.meal.ingredients[i].weight;
      summary.weight += weight;
      summary.fat += (weight * this.props.meal.ingredients[i].fat) / 100;
      summary.carbohydrate +=
        (weight * this.props.meal.ingredients[i].carbohydrate) / 100;
      summary.protein +=
        (weight * this.props.meal.ingredients[i].protein) / 100;
      summary.ethanol +=
        (weight * this.props.meal.ingredients[i].ethanol) / 100;
    }
    return (
      <div className="table">
        <div className="row">
          <div className="name-col col"></div>
          <div className="calories-col col">
            <div className="title">Calories</div>
            <div className="subtitle">kcal</div>
          </div>
          <div className="weight-col col">
            <div className="title">Weight</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="fat-col col">
            <div className="title">Fat</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="carbohydrate-col col">
            <div className="title">Carbs</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="protein-col col">
            <div className="title">Protein</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="ethanol-col col">
            <div className="title">Ethanol</div>
            <div className="subtitle">grams</div>
          </div>
          <div className="status-col col"></div>
        </div>
        {meal}
        <IngredientRow
          key={'adder'}
          update={this.flipAdd}
          changeFocus={this.changeFocus}
          mealId={this.props.meal._id}
          focus={this.state.focus}
          onSubmit={this.addIngredient}
          isNew={true}
          hasWeight={true}
          isNewMeal={true}
          cancel={this.flipAdd}
        />
        <IngredientRow
          key={'summary'}
          ingredient={summary}
          update={this.update}
          hasWeight={true}
          isSummary={true}
        />
      </div>
    );
  }

  changeFocus = async () => {
    this.setState({ focus: true });
    await this.props.changeFocus();
    this.setState({ focus: false });
  };

  addIngredient = async (ingredient) => {
    if (ingredient.weight === 0) return;
    let newId = '';
    if (!ingredient._id) {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/nutrition/ingredients/add/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken'),
          },
          body: JSON.stringify({
            name: ingredient.name,
            fat: ingredient.fat,
            carbohydrate: ingredient.carb,
            protein: ingredient.prot,
            ethanol: ingredient.eth,
          }),
        }
      );
      const data = await response.json();
      newId = data._id;
    } else newId = ingredient._id;

    await fetch(`${process.env.REACT_APP_URL}/nutrition/meals/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        mealId: ingredient.mealId,
        ingredient: {
          ingredientId: newId,
          weight: ingredient.weight,
        },
      }),
    });
    this.props.addNutrient({
      mealId: ingredient.mealId,
      ingredient: {
        _id: newId,
        name: ingredient.name,
        weight: ingredient.weight,
        fat: ingredient.fat,
        carbohydrate: ingredient.carb,
        protein: ingredient.prot,
        ethanol: ingredient.eth,
      },
    });
  };

  removeIngredient = async (ingredient) => {
    await fetch(`${process.env.REACT_APP_URL}/nutrition/meals/remove/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        mealId: ingredient.mealId,
        ingredientId: ingredient._id,
      }),
    });
    this.props.removeNutrient({
      mealId: ingredient.mealId,
      _id: ingredient._id,
    });
  };

  editIngredient = async (ingredient) => {
    await fetch(`${process.env.REACT_APP_URL}/nutrition/meals/edit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        mealId: ingredient.mealId,
        _id: ingredient._id,
        weight: ingredient.weight,
      }),
    });
    this.props.editNutrient({
      mealId: ingredient.mealId,
      ingredient: {
        _id: ingredient._id,
        name: ingredient.name,
        weight: ingredient.weight,
        fat: ingredient.fat,
        carbohydrate: ingredient.carb,
        protein: ingredient.prot,
        ethanol: ingredient.eth,
      },
    });
  };

  round = (value, precision) => {
    return Math.round(value * (1 / precision)) / (1 / precision);
  };

  flipAdd = async () => {
    await this.setState({
      add: !this.state.add,
    });
  };
}
