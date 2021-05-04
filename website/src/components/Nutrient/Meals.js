import React from 'react';
import MealEditor from './MealEditor';
import './Main.css';

export default class Meals extends React.Component {
  constructor() {
    super();
    this.state = {
      colours: {
        fatDark: '#ffd433',
        fatLight: '#ffe582',
        carbDark: '#ff3f3f',
        carbLight: '#ff9999',
        protDark: '#3fafff',
        protLight: '#99f1ff',
        ethDark: '#35ff38',
        ethLight: '#82ff84',
      },
      update: false,
      newMeal: false,
      meals: [],
      name: '',
      focus: false,
    };
  }

  changeFocus = async () => {
    await this.setState({ focus: false });
    this.setState({ focus: true });
  };

  async componentDidMount() {
    if (!localStorage.getItem('authToken')) window.location = '/login';
    this.getMealNames();
  }

  update = () => {
    this.setState({ update: !this.state.update });
    this.getMealNames();
  };

  flipNewMeal = () => {
    this.setState({ newMeal: !this.state.newMeal });
  };

  getMealNames = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(
      `${window.env.API_URL}/nutrition/meals/preset/names/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let meals = Object.assign({}, this.state.meals);
        meals = data.names;
        this.setState({ meals: meals });
      });
  };

  newMeal = (evt) => {
    evt.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
      body: JSON.stringify({
        name: this.state.name,
        ingredients: [],
      }),
    };
    fetch(
      `${window.env.API_URL}/nutrition/meals/preset/add/`,
      requestOptions
    ).then(() => {
      this.flipNewMeal();
      this.setState({ name: '' });
      this.getMealNames();
    });
  };

  nameChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.name;
    this.setState({ name: input });
  };

  render() {
    let meals = [];
    for (let i = 0; i < this.state.meals.length; i++) {
      meals.push(
        <MealEditor
          key={`meals${i}`}
          update={this.update}
          meal={this.state.meals[i]}
          colours={this.state.colours}
          focus={this.state.focus}
          changeFocus={this.changeFocus}
        />
      );
    }
    return (
      <div className="page">
        <div className="createMeal">
          {!this.state.newMeal && (
            <button className="mainButton button" onClick={this.flipNewMeal}>
              New Meal
            </button>
          )}
          {this.state.newMeal && (
            <form onSubmit={this.newMeal.bind(this)}>
              <div className="input-pair col">
                <label for="name">Meal Name</label>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  placeholder="Meal Name"
                  onChange={this.nameChange.bind(this)}
                  className="input"
                  required
                />
              </div>
              <input className="button" type="submit" value="Add" />
              <button className="errorButton button" onClick={this.flipNewMeal}>
                Cancel
              </button>
            </form>
          )}
        </div>
        {meals}
      </div>
    );
  }
}
