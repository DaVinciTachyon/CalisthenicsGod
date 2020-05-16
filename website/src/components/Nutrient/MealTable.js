import React from 'react';
import '../Main.css';
import NutrientAdder from './NutrientAdder';

export default class MealTable extends React.Component {
	constructor() {
		super();
		this.state = {
			add: false,
			update: false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.setState({ update: !this.state.update });
		}
	}

	flipAdd = async () => {
		await this.setState({
			add: !this.state.add
		});
		this.props.updateNutrients();
	};

	round = (value, precision) => {
		return Math.round(value * (1 / precision)) / (1 / precision);
	};

	removeIngredient = (index) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				mealId: this.props.meal._id,
				ingredientId: this.props.meal.ingredients[index]._id
			})
		};
		fetch('http://localhost:8080/nutrition/meals/remove/', requestOptions).then(() => {
			this.props.updateNutrients();
		});
	};

	render() {
		let meal = [];
		for (let i = 0; i < this.props.meal.ingredients.length; i++) {
			const weight = this.props.meal.ingredients[i].weight;
			meal.push(
				<tr key={this.props.meal.ingredients[i]._id}>
					<td>{this.props.meal.ingredients[i].name}</td>
					<td style={{ background: this.props.colours.fatLight }}>
						{this.round(this.props.meal.ingredients[i].fat * weight / 100, 0.1)}
					</td>
					<td style={{ background: this.props.colours.carbLight }}>
						{this.round(this.props.meal.ingredients[i].carbohydrate * weight / 100, 0.1)}
					</td>
					<td style={{ background: this.props.colours.protLight }}>
						{this.round(this.props.meal.ingredients[i].protein * weight / 100, 0.1)}
					</td>
					<td style={{ background: this.props.colours.ethLight }}>
						{this.round(this.props.meal.ingredients[i].ethanol * weight / 100, 0.1)}
					</td>
					<td>
						<button onClick={() => this.removeIngredient(i)}>×</button>
					</td>
				</tr>
			);
		}
		return (
			<div>
				<table className="centreMe">
					<tbody>
						<tr>
							<th>Name</th>
							<th>Fat</th>
							<th>Carbohydrate</th>
							<th>Protein</th>
							<th>Ethanol</th>
							<th />
						</tr>
						{meal}
						<tr>
							<td colSpan="5">
								{!this.state.add && <button onClick={this.flipAdd}>Add Ingredient</button>}
								{this.state.add && (
									<div>
										<NutrientAdder
											colours={this.props.colours}
											mealId={this.props.meal._id}
											updateNutrients={this.flipAdd}
											update={this.state.update}
										/>
										<button onClick={this.flipAdd}>Cancel</button>
									</div>
								)}
							</td>
						</tr>
					</tbody>
				</table>
				<br />
			</div>
		);
	}
}
