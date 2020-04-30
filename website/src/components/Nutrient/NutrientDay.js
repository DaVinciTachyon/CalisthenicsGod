import React from 'react';
import '../Main.css';

export default class NutrientDay extends React.Component {
	constructor() {
		super();
		this.state = {
			meals: []
		};
	}

	componentWillReceiveProps() {
		this.getMeals();
	}

	componentDidMount() {
		this.getMeals();
	}

	getMeals = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/nutrients/today/meals', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					meals: data.meals
				});
			});
	};

	render() {
		let meals = [];
		for (let i = 0; i < this.state.meals.length; i++) {
			meals.push(
				<tr key={this.state.meals[i]._id}>
					<td>{this.state.meals[i].name}</td>
					<td style={{ background: this.props.fatLight }}>{this.state.meals[i].fat}</td>
					<td style={{ background: this.props.carbLight }}>{this.state.meals[i].carbohydrate}</td>
					<td style={{ background: this.props.protLight }}>{this.state.meals[i].protein}</td>
					<td style={{ background: this.props.ethLight }}>{this.state.meals[i].ethanol}</td>
				</tr>
			);
		}
		return (
			<div className="card alignCentre">
				<table className="centreMe">
					<tbody>
						<tr>
							<th>Name</th>
							<th>Fat</th>
							<th>Carbohydrate</th>
							<th>Protein</th>
							<th>Ethanol</th>
						</tr>
						{meals}
					</tbody>
				</table>
			</div>
		);
	}
}
