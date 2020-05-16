import React from 'react';
import '../Main.css';
import NutrientAdder from './NutrientAdder';

export default class MealTable extends React.Component {
	constructor() {
		super();
		this.state = {
			add: false
		};
	}

	flipAdd = async () => {
		await this.setState({
			add: !this.state.add
		});
		this.props.update();
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
			this.props.update();
		});
	};

	render() {
		let meal = [];
		for (let i = 0; i < this.props.meal.ingredients.length; i++) {
			meal.push(
				<tr key={this.props.meal.ingredients[i]._id}>
					<td>{this.props.meal.ingredients[i].name}</td>
					<td style={{ background: this.props.fatLight }}>{this.props.meal.ingredients[i].fat}</td>
					<td style={{ background: this.props.carbLight }}>{this.props.meal.ingredients[i].carbohydrate}</td>
					<td style={{ background: this.props.protLight }}>{this.props.meal.ingredients[i].protein}</td>
					<td style={{ background: this.props.ethLight }}>{this.props.meal.ingredients[i].ethanol}</td>
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
											fatLight={this.props.fatLight}
											carbLight={this.props.carbLight}
											protLight={this.props.protLight}
											ethLight={this.props.ethLight}
											mealId={this.props.meal._id}
											update={this.flipAdd}
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
