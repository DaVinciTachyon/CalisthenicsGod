import React from 'react';
import IngredientRow from './IngredientRow';
import './Main.css';

export default class MealEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      showMeal: false,
      ingredients: [],
      newIngredient: false,
      focus: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.focus !== this.props.focus) {
      this.setState({
        focus: !this.state.focus,
      });
    }
  }

  changeFocus = async () => {
    this.setState({ focus: false });
    await this.props.changeFocus();
    this.setState({ focus: true });
  };

  showMeal = () => {
    this.setState({ showMeal: !this.state.showMeal });
  };

  componentDidMount() {
    this.getMeal();
  }

  getMeal = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ _id: this.props.meal._id }),
    };
    fetch(
      `${process.env.REACT_APP_URL}/nutrition/meals/preset/ingredients/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let ingredients = Object.assign({}, this.state.ingredients);
        ingredients = data.ingredients;
        this.setState({ ingredients: ingredients });
      });
  };

  removeMeal = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({ _id: this.props.meal._id }),
    };
    fetch(
      `${process.env.REACT_APP_URL}/nutrition/meals/preset/remove/`,
      requestOptions
    ).then(() => {
      this.showMeal();
      this.props.update();
    });
  };

  addIngredient = (ingredient) => {
    if (!ingredient._id) {
      fetch(`${process.env.REACT_APP_URL}/nutrition/ingredients/add/`, {
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
      })
        .then((response) => response.json())
        .then(async (data) => {
          await fetch(
            `${process.env.REACT_APP_URL}/nutrition/meals/preset/addIngredient/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken'),
              },
              body: JSON.stringify({
                _id: ingredient.mealId,
                ingredient: {
                  ingredientId: data._id,
                  weight: ingredient.weight,
                },
              }),
            }
          );
        })
        .then(() => {
          this.getMeal();
        });
    } else {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          _id: ingredient.mealId,
          ingredient: {
            ingredientId: ingredient._id,
            weight: ingredient.weight,
          },
        }),
      };
      fetch(
        `${process.env.REACT_APP_URL}/nutrition/meals/preset/addIngredient/`,
        requestOptions
      ).then(() => {
        this.getMeal();
      });
    }
  };

  onSubmit = (ingredient) => {
    fetch(
      `${process.env.REACT_APP_URL}/nutrition/meals/preset/editIngredient/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          ingredientId: ingredient._id,
          _id: ingredient.mealId,
          weight: ingredient.weight,
        }),
      }
    ).then(() => {
      this.getMeal();
    });
  };

  submitStatus = (ingredient) => {
    fetch(
      `${process.env.REACT_APP_URL}/nutrition/meals/preset/removeIngredient/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          ingredientId: ingredient._id,
          _id: ingredient.mealId,
        }),
      }
    ).then(() => {
      this.getMeal();
    });
  };

  flipNewIngredient = () => {
    this.setState({ newIngredient: !this.state.newIngredient });
  };

  render() {
    let ingredients = [];
    let summary = {
      name: 'Total',
      weight: 0,
      fat: 0,
      carbohydrate: 0,
      protein: 0,
      ethanol: 0,
    };
    for (let i = 0; i < this.state.ingredients.length; i++) {
      ingredients.push(
        <IngredientRow
          key={`${i}${this.state.ingredients[i]._id}`}
          colours={this.props.colours}
          ingredient={this.state.ingredients[i]}
          mealId={this.props.meal._id}
          changeFocus={this.changeFocus}
          focus={this.state.focus}
          onSubmit={this.onSubmit}
          submitStatus={this.submitStatus}
          hasWeight={true}
        />
      );
      const weight = this.state.ingredients[i].weight;
      summary.weight += weight;
      summary.fat += (weight * this.state.ingredients[i].fat) / 100;
      summary.carbohydrate +=
        (weight * this.state.ingredients[i].carbohydrate) / 100;
      summary.protein += (weight * this.state.ingredients[i].protein) / 100;
      summary.ethanol += (weight * this.state.ingredients[i].ethanol) / 100;
    }
    return (
      <div className="meal">
        <button className="secondaryButton button" onClick={this.showMeal}>
          {this.props.meal.name}
        </button>
        {this.state.showMeal && (
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
            {ingredients}
            <IngredientRow
              key={'adder'}
              colours={this.props.colours}
              update={() => {
                this.update();
                this.showMeal();
              }}
              changeFocus={this.changeFocus}
              mealId={this.props.meal._id}
              focus={this.state.focus}
              onSubmit={this.addIngredient}
              isNew={true}
              hasWeight={true}
              isNewMeal={true}
              cancel={this.flipNewIngredient}
            />
            <IngredientRow
              key={'summary'}
              colours={this.props.colours}
              ingredient={summary}
              update={() => {}}
              hasWeight={true}
              isSummary={true}
            />
            <button
              className="exit deleteButton button"
              onClick={this.showMeal}
            >
              Exit
            </button>
            <button
              className="delete errorButton button"
              onClick={this.removeMeal}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}
