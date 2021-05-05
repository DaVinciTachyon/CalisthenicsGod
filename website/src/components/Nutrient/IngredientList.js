import React from 'react';
import IngredientRow from './IngredientRow';
import '../../style/Nutrient.css';

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
    let url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/`;
    if (this.props.isUnavailable)
      url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/unavailable`;
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
    fetch(`${process.env.REACT_APP_API_URL}/nutrition/ingredients/add/`, {
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
    await fetch(`${process.env.REACT_APP_API_URL}/nutrition/ingredients/edit/`, {
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
    let url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/makeUnavailable/`;
    if (this.props.isUnavailable)
      url = `${process.env.REACT_APP_API_URL}/nutrition/ingredients/makeAvailable/`;
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
      <div className="ingredients">
        <div className="row title bigTitle">
        {!this.props.isUnavailable && <div className="fullWidth">Available</div>}
        {this.props.isUnavailable && <div className="fullWidth">Unavailable</div>}
        </div>
        <div className="row">
          <div className="name-column column"></div>
          <div className="calories-column column">
            <div className="title">Calories</div>
            <div className="title subtitle">kcal</div>
          </div>
          <div className="fat-column column">
            <div className="title">Fat</div>
            <div className="title subtitle">grams</div>
          </div>
          <div className="carbohydrate-column column">
            <div className="title">Carbs</div>
            <div className="title subtitle">grams</div>
          </div>
          <div className="protein-column column">
            <div className="title">Protein</div>
            <div className="title subtitle">grams</div>
          </div>
          <div className="ethanol-column column">
            <div className="title">Ethanol</div>
            <div className="title subtitle">grams</div>
          </div>
          <div className="status-column column"></div>
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
