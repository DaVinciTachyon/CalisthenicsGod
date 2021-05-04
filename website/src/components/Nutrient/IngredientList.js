import React from 'react';
import IngredientRow from './IngredientRow';
import './Main.css';
import env from "react-dotenv";

export default class IngredientList extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      focus: false,
      fat: 0,
      carb: 0,
      prot: 0,
      eth: 0,
      name: '',
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.update !== this.props.update) {
      this.getIngredients();
    }
    if (prevProps.focus !== this.props.focus) {
      this.setState({ focus: !this.state.focus });
    }
  }

  componentDidMount() {
    this.getIngredients();
  }

  getIngredients = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    let url = `${env.API_URL}/nutrition/ingredients/`;
    if (this.props.isUnavailable)
      url = `${env.API_URL}/nutrition/ingredients/unavailable`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let ingredients = Object.assign({}, this.state.ingredients);
        ingredients = data.ingredients;
        this.setState({ ingredients: ingredients });
      });
  };

  update = () => {
    this.getIngredients();
    this.props.updateIngredients();
  };

  changeFocus = async () => {
    await this.setState({ focus: false });
    await this.props.changeFocus();
    this.setState({ focus: true });
  };

  nameChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.name;
    this.setState({ name: input });
  };

  fatChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.fat;
    if (!input || !isFinite(String(input))) input = 0;
    if (input > 0) input = input.replace(/^0+/, '');
    this.setState({ fat: input });
  };

  carbChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.carb;
    if (!input || !isFinite(String(input))) input = 0;
    if (input > 0) input = input.replace(/^0+/, '');
    this.setState({ carb: input });
  };

  protChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.prot;
    if (!input || !isFinite(String(input))) input = 0;
    if (input > 0) input = input.replace(/^0+/, '');
    this.setState({ prot: input });
  };

  ethChange = (evt) => {
    let input = evt.target.validity.valid ? evt.target.value : this.state.eth;
    if (!input || !isFinite(String(input))) input = 0;
    if (input > 0) input = input.replace(/^0+/, '');
    this.setState({ eth: input });
  };

  addIngredient = (ingredient) => {
    fetch(`${env.API_URL}/nutrition/ingredients/add/`, {
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
    }).then(() => {
      this.update();
    });
  };

  onSubmit = async (ingredient) => {
    await fetch(`${env.API_URL}/nutrition/ingredients/edit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: ingredient._id,
        name: ingredient.name,
        fat: ingredient.fat,
        carbohydrate: ingredient.carb,
        protein: ingredient.prot,
        ethanol: ingredient.eth,
      }),
    });
    this.update();
  };

  submitStatus = (ingredient) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        _id: ingredient._id,
      }),
    };
    let url = `${env.API_URL}/nutrition/ingredients/makeUnavailable/`;
    if (this.props.isUnavailable)
      url = `${env.API_URL}/nutrition/ingredients/makeAvailable/`;
    fetch(url, requestOptions).then(() => {
      this.update();
    });
  };

  render() {
    let ingredients = [];
    for (let i = 0; i < this.state.ingredients.length; i++) {
      ingredients.push(
        <IngredientRow
          key={this.state.ingredients[i]._id}
          colours={this.props.colours}
          isUnavailable={this.props.isUnavailable}
          ingredient={this.state.ingredients[i]}
          update={this.update}
          changeFocus={this.changeFocus}
          focus={this.state.focus}
          onSubmit={this.onSubmit}
          submitStatus={this.submitStatus}
        />
      );
    }
    if (ingredients.length === 0 && this.props.isUnavailable) return <div />;
    return (
      <div className="table">
        {!this.props.isUnavailable && <div className="title">Available</div>}
        {this.props.isUnavailable && <div className="title">Unavailable</div>}
        <div className="row">
          <div className="name-col col"></div>
          <div className="calories-col col">
            <div className="title">Calories</div>
            <div className="subtitle">kcal</div>
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
        {!this.props.isUnavailable && (
          <IngredientRow
            key={'adder'}
            colours={this.props.colours}
            update={this.update}
            changeFocus={this.changeFocus}
            focus={this.state.focus}
            onSubmit={this.addIngredient}
            isNew={true}
          />
        )}
        {ingredients}
      </div>
    );
  }
}
