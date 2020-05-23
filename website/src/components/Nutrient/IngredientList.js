import React from 'react';
import '../Main.css';
import IngredientRow from './IngredientRow';

export default class IngredientList extends React.Component {
	constructor() {
		super();
		this.state = {
			ingredients : [],
			focus       : false,
			fat         : 0,
			carb        : 0,
			prot        : 0,
			eth         : 0,
			name        : ''
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.getIngredients();
		}
		if (prevProps.focus !== this.props.focus) {
			this.setState({ focus: !this.state.focus });
		}
	}

	componentDidMount() {
		this.getIngredients();
	}

	getIngredients = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		let url = 'http://localhost:8080/nutrition/ingredients/';
		if (this.props.isUnavailable)
			url = 'http://localhost:8080/nutrition/ingredients/unavailable';
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

	changeFocus = async () => {
		await this.setState({ focus: false });
		await this.props.changeFocus();
		this.setState({ focus: true });
	};

	nameChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.name;
		this.setState({ name: input });
	};

	fatChange = (evt) => {
		let input = evt.target.validity.valid ? evt.target.value : this.state.fat;
		if (!input || !isFinite(String(input))) input = 0;
		if (input > 0) input = input.replace(/^0+/, '');
		this.setState({ fat: input });
	};

	carbChange = (evt) => {
		let input = evt.target.validity.valid ? evt.target.value : this.state.carb;
		if (!input || !isFinite(String(input))) input = 0;
		if (input > 0) input = input.replace(/^0+/, '');
		this.setState({ carb: input });
	};

	protChange = (evt) => {
		let input = evt.target.validity.valid ? evt.target.value : this.state.prot;
		if (!input || !isFinite(String(input))) input = 0;
		if (input > 0) input = input.replace(/^0+/, '');
		this.setState({ prot: input });
	};

	ethChange = (evt) => {
		let input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		if (!input || !isFinite(String(input))) input = 0;
		if (input > 0) input = input.replace(/^0+/, '');
		this.setState({ eth: input });
	};

	addIngredient = (ingredient) => {
		fetch('http://localhost:8080/nutrition/ingredients/add/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				name         : ingredient.name,
				fat          : ingredient.fat,
				carbohydrate : ingredient.carb,
				protein      : ingredient.prot,
				ethanol      : ingredient.eth
			})
		}).then(() => {
			this.update();
		});
	};

	onSubmit = async (ingredient) => {
		await fetch('http://localhost:8080/nutrition/ingredients/edit/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				_id          : ingredient._id,
				name         : ingredient.name,
				fat          : ingredient.fat,
				carbohydrate : ingredient.carb,
				protein      : ingredient.prot,
				ethanol      : ingredient.eth
			})
		});
		this.update();
	};

	submitStatus = (ingredient) => {
		const requestOptions = {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				_id : ingredient._id
			})
		};
		let url = 'http://localhost:8080/nutrition/ingredients/makeUnavailable/';
		if (this.props.isUnavailable)
			url = 'http://localhost:8080/nutrition/ingredients/makeAvailable/';
		fetch(url, requestOptions).then(() => {
			this.update();
		});
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
					changeFocus={this.changeFocus}
					focus={this.state.focus}
					onSubmit={this.onSubmit}
					submitStatus={this.submitStatus}
				/>
			);
		}
		if (ingredients.length === 0 && this.props.isUnavailable) return <div />;
		return (
			<div className="alignCentre">
				<table className="centreMe ingredientTable">
					{!this.props.isUnavailable && <caption>Available</caption>}
					{this.props.isUnavailable && <caption>Unavailable</caption>}
					<tbody>
						<tr className="title">
							<th />
							<th>Calories</th>
							<th>Fat</th>
							<th>Carbohydrate</th>
							<th>Protein</th>
							<th>Ethanol</th>
							<th />
						</tr>
						<tr className="subtitle">
							<th />
							<th>kcal</th>
							<th>grams</th>
							<th>grams</th>
							<th>grams</th>
							<th>grams</th>
							<th />
						</tr>
						{!this.props.isUnavailable && (
							<IngredientRow
								key={'adder'}
								colours={this.props.colours}
								update={this.update}
								changeFocus={this.changeFocus}
								focus={this.state.focus}
								onSubmit={this.addIngredient}
								isNew={true}
							/>
						)}
						{ingredients}
					</tbody>
				</table>
			</div>
		);
	}
}
