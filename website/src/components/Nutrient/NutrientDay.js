import React from 'react';
import '../Main.css';
import NutrientAdder from './NutrientAdder';
import MealTable from './MealTable';

export default class NutrientDay extends React.Component {
	constructor() {
		super();
		this.state = {
			meals: [],
			newMeal: false,
			update: false
		};
	}

	componentDidMount() {
		this.getMeals();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.setState({ update: !this.state.update });
			this.getMeals();
		}
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
		this.props.updateNutrients();
		this.setState({ update: !this.state.update });
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
					colours={this.props.colours}
					meal={this.state.meals[i]}
					updateNutrients={this.update}
					update={this.state.update}
				/>
			);
		}
		return (
			<div className="alignCentre">
				{meals}
				{meals.length !== 0 && !this.state.newMeal && <button onClick={this.flipNewMeal}>New Meal</button>}
				{(meals.length === 0 || this.state.newMeal) && (
					<NutrientAdder
						colours={this.props.colours}
						updateNutrients={() => {
							this.update();
							this.setState({
								newMeal: false
							});
						}}
						update={this.state.update}
					/>
				)}
				{meals.length !== 0 && this.state.newMeal && <button onClick={this.flipNewMeal}>Cancel</button>}
			</div>
		);
	}
}
