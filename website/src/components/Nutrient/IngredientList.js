import React from 'react';
import '../Main.css';

export default class IngredientList extends React.Component {
	constructor() {
		super();
		this.state = {
			ingredients: []
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.getIngredients();
		}
	}

	componentDidMount() {
		this.getIngredients();
	}

	getIngredients = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/nutrition/ingredients/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let ingredients = Object.assign({}, state.ingredients);
					ingredients = data.ingredients;
					return { ingredients };
				});
			});
	};

	render() {
		let ingredients = [];
		for (let i = 0; i < this.state.ingredients.length; i++) {
			ingredients.push(
				<tr key={this.state.ingredients[i]._id}>
					<td>{this.state.ingredients[i].name}</td>
					<td style={{ background: this.props.fatLight }}>{this.state.ingredients[i].fat}</td>
					<td style={{ background: this.props.carbLight }}>{this.state.ingredients[i].carbohydrate}</td>
					<td style={{ background: this.props.protLight }}>{this.state.ingredients[i].protein}</td>
					<td style={{ background: this.props.ethLight }}>{this.state.ingredients[i].ethanol}</td>
				</tr>
			);
		}
		return (
			<div className="alignCentre">
				<table className="centreMe">
					<tbody>
						<tr>
							<th>Name</th>
							<th>Fat</th>
							<th>Carbohydrate</th>
							<th>Protein</th>
							<th>Ethanol</th>
						</tr>
						{ingredients}
					</tbody>
				</table>
			</div>
		);
	}
}
