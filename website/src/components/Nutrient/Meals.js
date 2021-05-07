import React from 'react';
import MealEditor from './MealEditor';
import { Row, Column } from '../../style/table';
import { Button, ErrorButton } from '../../style/buttons';

export default class Meals extends React.Component {
  constructor() {
    super();
    this.state = {
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
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/names/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let meals = Object.assign({}, this.state.meals);
        meals = data.names;
        this.setState({ meals: meals });
      });
  };

  newMeal = () => {
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
      `${process.env.REACT_APP_API_URL}/nutrition/meals/preset/add/`,
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
          focus={this.state.focus}
          changeFocus={this.changeFocus}
        />
      );
    }
    return (
      <>
        {!this.state.newMeal && (
          <Row>
            <Column>
              <Button onClick={this.flipNewMeal}>New Meal</Button>
            </Column>
          </Row>
        )}
        {this.state.newMeal && (
          <Row columns={2}>
            <Column>
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
            </Column>
            <Column>
              <Button onClick={this.newMeal.bind(this)}>Add</Button>
              <ErrorButton onClick={this.flipNewMeal}>Cancel</ErrorButton>
            </Column>
          </Row>
        )}
        {meals}
      </>
    );
  }
}
