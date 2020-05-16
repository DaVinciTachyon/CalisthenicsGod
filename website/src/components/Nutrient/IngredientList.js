import React from 'react';
import '../Main.css';
import IngredientRow from './IngredientRow';

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
		let url = 'http://localhost:8080/nutrition/ingredients/';
		if (this.props.isUnavailable) url = 'http://localhost:8080/nutrition/ingredients/unavailable';
		fetch(url, requestOptions).then((response) => response.json()).then((data) => {
			this.setState((state) => {
				let ingredients = Object.assign({}, state.ingredients);
				ingredients = data.ingredients;
				return { ingredients };
			});
		});
	};

	update = () => {
		this.getIngredients();
		this.props.updateIngredients();
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
				/>
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
							<th />
							<th />
						</tr>
						{ingredients}
					</tbody>
				</table>
			</div>
		);
	}
}
