import React from 'react';
import '../Main.css';
import Modal from '../Modal';
import IngredientRow from './IngredientRow';

export default class MealEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			showMeal      : false,
			ingredients   : [],
			newIngredient : false,
			focus         : false
		};
	}

	componentDidMount() {
		this.getMeal();
	}

	getMeal = () => {
		const requestOptions = {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({ _id: this.props.meal._id })
		};
		fetch('http://localhost:8080/nutrition/meals/preset/ingredients/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let ingredients = Object.assign({}, state.ingredients);
					ingredients = data.ingredients;
					return { ingredients };
				});
			});
	};

	removeMeal = () => {
		const requestOptions = {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({ _id: this.props.meal._id })
		};
		fetch('http://localhost:8080/nutrition/meals/preset/remove/', requestOptions).then(() => {
			this.showMeal();
			this.props.update();
		});
	};

	showMeal = () => {
		this.setState({ showMeal: !this.state.showMeal });
	};

	addIngredient = (ingredient) => {
		if (!ingredient._id) {
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
			})
				.then((response) => response.json())
				.then(async (data) => {
					await fetch('http://localhost:8080/nutrition/meals/preset/addIngredient/', {
						method  : 'POST',
						headers : {
							'Content-Type' : 'application/json',
							'auth-token'   : localStorage.getItem('authToken')
						},
						body    : JSON.stringify({
							_id        : ingredient.mealId,
							ingredient : {
								ingredientId : data._id,
								weight       : ingredient.weight
							}
						})
					});
				})
				.then(() => {
					this.getMeal();
				});
		} else {
			const requestOptions = {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'auth-token'   : localStorage.getItem('authToken')
				},
				body    : JSON.stringify({
					_id        : ingredient.mealId,
					ingredient : {
						ingredientId : ingredient._id,
						weight       : ingredient.weight
					}
				})
			};
			fetch(
				'http://localhost:8080/nutrition/meals/preset/addIngredient/',
				requestOptions
			).then(() => {
				this.getMeal();
			});
		}
	};

	changeFocus = async () => {
		await this.setState({ focus: false });
		this.setState({ focus: true });
	};

	onSubmit = (ingredient) => {
		fetch('http://localhost:8080/nutrition/meals/preset/editIngredient/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				ingredientId : ingredient._id,
				_id          : ingredient.mealId,
				weight       : ingredient.weight
			})
		}).then(() => {
			this.getMeal();
		});
	};

	submitStatus = (ingredient) => {
		fetch('http://localhost:8080/nutrition/meals/preset/removeIngredient/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				ingredientId : ingredient._id,
				_id          : ingredient.mealId
			})
		}).then(() => {
			this.getMeal();
		});
	};

	flipNewIngredient = () => {
		this.setState({ newIngredient: !this.state.newIngredient });
	};

	render() {
		let ingredients = [];
		let summary = {
			name         : 'Total',
			weight       : 0,
			fat          : 0,
			carbohydrate : 0,
			protein      : 0,
			ethanol      : 0
		};
		for (let i = 0; i < this.state.ingredients.length; i++) {
			ingredients.push(
				<IngredientRow
					key={`${i}${this.state.ingredients[i]._id}`}
					colours={this.props.colours}
					ingredient={this.state.ingredients[i]}
					mealId={this.props.meal._id}
					update={this.update}
					changeFocus={this.changeFocus}
					focus={this.state.focus}
					onSubmit={this.onSubmit}
					submitStatus={this.submitStatus}
					hasWeight={true}
				/>
			);
			const weight = this.state.ingredients[i].weight;
			summary.weight += weight;
			summary.fat += weight * this.state.ingredients[i].fat / 100;
			summary.carbohydrate += weight * this.state.ingredients[i].carbohydrate / 100;
			summary.protein += weight * this.state.ingredients[i].protein / 100;
			summary.ethanol += weight * this.state.ingredients[i].ethanol / 100;
		}
		return (
			<div>
				<button onClick={this.showMeal}>{this.props.meal.name}</button>
				<Modal isOpen={this.state.showMeal} toggle={this.showMeal}>
					<div className="alignCentre">
						<table className="centreMe ingredientTable">
							<tbody>
								<tr className="title">
									<th />
									<th>Calories</th>
									<th>Weight</th>
									<th>Fat</th>
									<th>Carbohydrate</th>
									<th>Protein</th>
									<th>Ethanol</th>
									<th />
									<th />
								</tr>
								<tr className="subtitle">
									<th />
									<th>kcal</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th />
									<th />
								</tr>
								{ingredients}
								<IngredientRow
									key={'adder'}
									colours={this.props.colours}
									update={() => {
										this.update();
										this.flipNewMeal();
									}}
									changeFocus={this.changeFocus}
									mealId={this.props.meal._id}
									focus={this.state.focus}
									onSubmit={this.addIngredient}
									isNew={true}
									hasWeight={true}
									isNewMeal={true}
									cancel={this.flipNewIngredient}
								/>
								<IngredientRow
									key={'summary'}
									colours={this.props.colours}
									ingredient={summary}
									update={() => {
										this.update();
										this.flipNewMeal();
									}}
									hasWeight={true}
									isSummary={true}
								/>
							</tbody>
						</table>
						<br />
						<button onClick={this.removeMeal}>Delete</button>
						<br />
						<br />
						<button onClick={this.showMeal}>Exit</button>
					</div>
				</Modal>
			</div>
		);
	}
}
