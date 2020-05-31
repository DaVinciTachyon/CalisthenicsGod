import React from "react";
import Modal from "../Modal";
import IngredientRow from "./IngredientRow";
import "./Main.css";

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

  componentDidMount() {
    this.getMeal();
  }

  getMeal = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ _id: this.props.meal._id }),
    };
    fetch(
      "http://localhost:8080/nutrition/meals/preset/ingredients/",
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ _id: this.props.meal._id }),
    };
    fetch(
      "http://localhost:8080/nutrition/meals/preset/remove/",
      requestOptions
    ).then(() => {
      this.showMeal();
      this.props.update();
    });
  };

  showMeal = () => {
    this.setState({ showMeal: !this.state.showMeal });
  };

  addIngredient = (ingredient) => {
    if (!ingredient._id) {
      fetch("http://localhost:8080/nutrition/ingredients/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
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
            "http://localhost:8080/nutrition/meals/preset/addIngredient/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("authToken"),
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
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
        "http://localhost:8080/nutrition/meals/preset/addIngredient/",
        requestOptions
      ).then(() => {
        this.getMeal();
      });
    }
  };

  changeFocus = async () => {
    await this.setState({ focus: false });
    this.setState({ focus: true });
  };

  onSubmit = (ingredient) => {
    fetch("http://localhost:8080/nutrition/meals/preset/editIngredient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        ingredientId: ingredient._id,
        _id: ingredient.mealId,
        weight: ingredient.weight,
      }),
    }).then(() => {
      this.getMeal();
    });
  };

  submitStatus = (ingredient) => {
    fetch("http://localhost:8080/nutrition/meals/preset/removeIngredient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        ingredientId: ingredient._id,
        _id: ingredient.mealId,
      }),
    }).then(() => {
      this.getMeal();
    });
  };

  flipNewIngredient = () => {
    this.setState({ newIngredient: !this.state.newIngredient });
  };

  render() {
    let ingredients = [];
    let summary = {
      name: "Total",
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
          update={this.update}
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
      <div>
        <button onClick={this.showMeal}>{this.props.meal.name}</button>
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
              key={"adder"}
              colours={this.props.colours}
              update={() => {
                this.update();
                this.flipNewMeal();
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
              key={"summary"}
              colours={this.props.colours}
              ingredient={summary}
              update={() => {
                this.update();
                this.flipNewMeal();
              }}
              hasWeight={true}
              isSummary={true}
            />
            <button onClick={this.removeMeal}>Delete</button>
            <button onClick={this.showMeal}>Exit</button>
          </div>
        )}
      </div>
    );
  }
}
