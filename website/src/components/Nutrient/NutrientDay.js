import React from 'react';
import '../Main.css';
import NutrientAdder from './NutrientAdder';
import MealTable from './MealTable';

export default class NutrientDay extends React.Component {
	constructor() {
		super();
		this.state = {
			meals: [],
			newMeal: false
		};
	}

	componentDidMount() {
		this.getMeals();
	}

	getMeals = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/nutrition/meals/today/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let meals = Object.assign({}, state.meals);
					meals = data.meals;
					return { meals };
				});
			});
	};

	update = () => {
		this.getMeals();
		this.props.update();
	};

	flipNewMeal = () => {
		this.setState({
			newMeal: !this.state.newMeal
		});
	};

	render() {
		let meals = [];
		for (let i = 0; i < this.state.meals.length; i++) {
			meals.push(
				<MealTable
					fatLight={this.props.fatLight}
					carbLight={this.props.carbLight}
					protLight={this.props.protLight}
					ethLight={this.props.ethLight}
					meal={this.state.meals[i]}
					update={this.update}
				/>
			);
		}
		return (
			<div className="alignCentre">
				{meals}
				{meals.length !== 0 && !this.state.newMeal && <button onClick={this.flipNewMeal}>New Meal</button>}
				{(meals.length === 0 || this.state.newMeal) && (
					<div>
						<NutrientAdder
							fatLight={this.props.fatLight}
							carbLight={this.props.carbLight}
							protLight={this.props.protLight}
							ethLight={this.props.ethLight}
							update={this.update}
						/>
						<button onClick={this.flipNewMeal}>Cancel</button>
					</div>
				)}
			</div>
		);
	}
}
