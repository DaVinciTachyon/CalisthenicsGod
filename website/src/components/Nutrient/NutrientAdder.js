import React from 'react';
import '../Main.css';

export default class NutrientAdder extends React.Component {
	constructor() {
		super();
		this.state = {
			fat: 0,
			carb: 0,
			prot: 0,
			eth: 0,
			name: '',
			ingredientId: '',
			weight: 0,
			ingredients: []
		};
	}

	nameChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.name;
		this.setState({ name: input });
	};

	fatChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.fat;
		this.setState({ fat: input });
	};

	carbChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.carb;
		this.setState({ carb: input });
	};

	protChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.prot;
		this.setState({ prot: input });
	};

	ethChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		this.setState({ eth: input });
	};

	ingredientChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		this.setState({ ingredientId: input });
	};

	weightChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		this.setState({ weight: input });
	};

	addMacros = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				history: [
					{
						name: this.state.name,
						fat: this.state.fat,
						carbohydrate: this.state.carb,
						protein: this.state.prot,
						ethanol: this.state.eth
					}
				]
			})
		};
		fetch('http://localhost:8080/nutrition/history/', requestOptions).then(() => {
			this.props.addMacros();
		});
		this.setState({
			name: '',
			fat: 0,
			carb: 0,
			prot: 0,
			eth: 0
		});
	};

	addIngredient = (evt) => {
		evt.preventDefault();
		if (!this.state.ingredientId) return this.setState({ error: 'Ingredient is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				history: [
					{
						ingredientId: this.state.ingredientId,
						weight: this.state.weight
					}
				]
			})
		};
		fetch('http://localhost:8080/nutrition/history/', requestOptions).then(() => {
			this.props.addMacros();
		});
		// this.setState({
		// 	ingredientId: '',
		// 	weight: 0
		// });
	};

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
		let ingredients = []
		for(let i = 0; i < this.state.ingredients.length; i++) {
			ingredients.push(
			<option key={this.state.ingredients[i]._id} value={this.state.ingredients[i]._id}>
				{this.state.ingredients[i].name}
			</option>);
		}
		return ingredients;
	}

	render() {
		return (
			<div className="card alignCentre">
				<form className="centreMe" onSubmit={this.addMacros}>
					<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.nameChange.bind(this)}
						className="input"
					/>
					<input
						name="fat"
						type="number"
						min="0"
						step="0.1"
						value={this.state.fat}
						onChange={this.fatChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.fatLight }}
					/>
					<input
						name="carb"
						type="number"
						min="0"
						step="0.1"
						value={this.state.carb}
						onChange={this.carbChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.carbLight }}
					/>
					<input
						name="prot"
						type="number"
						min="0"
						step="0.1"
						value={this.state.prot}
						onChange={this.protChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.protLight }}
					/>
					<input
						name="eth"
						type="number"
						min="0"
						step="0.1"
						value={this.state.eth}
						onChange={this.ethChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.ethLight }}
					/>
					<input type="submit" value="Add" />
				</form>
				<form className="centreMe" onSubmit={this.addIngredient}>
					<select name="ingredient" onChange={this.ingredientChange.bind(this)}>
						<option value="">Select Ingredient</option>
						{this.getIngredients()}
					</select>
					<input
						name="weight"
						type="number"
						min="0"
						step="0.1"
						value={this.state.weight}
						onChange={this.weightChange.bind(this)}
						className="numInput input"
					/>
					<input type="submit" value="Add" />
				</form>
			</div>
		);
	}
}
