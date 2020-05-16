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

	componentWillUnmount() {
		// fix Warning: Can't perform a React state update on an unmounted component
		this.setState = (state, callback) => {
			return;
		};
	}

	componentDidMount() {
		this.getIngredients();
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

	ingredientChange = async (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		await this.setState({
			ingredientId: input,
			weight: 0,
			name: ''
		});
		this.updateMacros();
	};

	weightChange = async (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		await this.setState({ weight: input });
		if (this.state.ingredientId !== '') this.updateMacros();
	};

	updateMacros = () => {
		let fat = 0;
		let carb = 0;
		let prot = 0;
		let eth = 0;
		if (this.state.ingredientId !== '') {
			const ingredient = this.state.ingredients.find((ing) => ing._id === this.state.ingredientId);
			fat = ingredient.fat;
			carb = ingredient.carbohydrate;
			prot = ingredient.protein;
			eth = ingredient.ethanol;
		}
		this.setState({
			fat: fat,
			carb: carb,
			prot: prot,
			eth: eth
		});
	};

	addIngredient = (evt) => {
		evt.preventDefault();
		let ingredient = {};
		if (this.state.ingredientId === '')
			ingredient = {
				name: this.state.name,
				fat: Math.round(this.state.fat * this.state.weight / 100 * 10) / 10,
				carbohydrate: Math.round(this.state.carb * this.state.weight / 100 * 10) / 10,
				protein: Math.round(this.state.prot * this.state.weight / 100 * 10) / 10,
				ethanol: Math.round(this.state.eth * this.state.weight / 100 * 10) / 10
			};
		else
			ingredient = {
				ingredientId: this.state.ingredientId,
				weight: this.state.weight
			};
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				mealId: this.props.mealId === '' ? undefined : this.props.mealId,
				ingredient: ingredient
			})
		};
		fetch('http://localhost:8080/nutrition/meals/', requestOptions).then(() => {
			this.props.update();
			this.setState({
				ingredientId: '',
				name: '',
				weight: 0,
				fat: 0,
				carb: 0,
				prot: 0,
				eth: 0
			});
		});
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
	};

	render() {
		let ingredients = [];
		for (let i = 0; i < this.state.ingredients.length; i++) {
			ingredients.push(
				<option key={this.state.ingredients[i]._id} value={this.state.ingredients[i]._id}>
					{this.state.ingredients[i].name}
				</option>
			);
		}
		return (
			<div className="alignCentre">
				<form className="centreMe" onSubmit={this.addIngredient}>
					<select name="ingredient" onChange={this.ingredientChange.bind(this)}>
						<option value="" selected={this.state.ingredientId === ''}>
							Add Own Ingredient
						</option>
						{ingredients}
					</select>
					{this.state.ingredientId === '' && (
						<input
							name="name"
							type="text"
							value={this.state.name}
							onChange={this.nameChange.bind(this)}
							className="input"
						/>
					)}
					<br />
					<input
						name="fat"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.fat}
						onChange={this.fatChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.fatLight }}
						readOnly={this.state.ingredientId !== ''}
					/>
					<input
						name="carb"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.carb}
						onChange={this.carbChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.carbLight }}
						readOnly={this.state.ingredientId !== ''}
					/>
					<input
						name="prot"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.prot}
						onChange={this.protChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.protLight }}
						readOnly={this.state.ingredientId !== ''}
					/>
					<input
						name="eth"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.eth}
						onChange={this.ethChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.ethLight }}
						readOnly={this.state.ingredientId !== ''}
					/>
					<br />
					<input
						name="weight"
						type="number"
						min="0.1"
						step="0.1"
						value={this.state.weight}
						onChange={this.weightChange.bind(this)}
						className="numInput input"
					/>
					<input
						type="number"
						min="0"
						step="0.1"
						value={Math.round(this.state.fat * this.state.weight / 100 * 10) / 10}
						className="numInput input"
						style={{ background: this.props.fatLight }}
						readOnly
					/>
					<input
						type="number"
						min="0"
						step="0.1"
						value={Math.round(this.state.carb * this.state.weight / 100 * 10) / 10}
						className="numInput input"
						style={{ background: this.props.carbLight }}
						readOnly
					/>
					<input
						type="number"
						min="0"
						step="0.1"
						value={Math.round(this.state.prot * this.state.weight / 100 * 10) / 10}
						className="numInput input"
						style={{ background: this.props.protLight }}
						readOnly
					/>
					<input
						type="number"
						min="0"
						step="0.1"
						value={Math.round(this.state.eth * this.state.weight / 100 * 10) / 10}
						className="numInput input"
						style={{ background: this.props.ethLight }}
						readOnly
					/>
					<br />
					<label for="calories">Calories:</label>
					<input
						name="calories"
						type="number"
						min="0"
						step="1"
						value={Math.round(
							this.state.fat * this.state.weight / 100 * 9 +
								this.state.carb * this.state.weight / 100 * 4 +
								this.state.prot * this.state.weight / 100 * 4 +
								this.state.eth * this.state.weight / 100 * 7
						)}
						className="numInput input"
						readOnly
					/>
					<br />
					<input type="submit" value="Add" />
				</form>
			</div>
		);
	}
}
