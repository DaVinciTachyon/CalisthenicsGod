import React from 'react';
import '../Main.css';
import IngredientRow from './IngredientRow';

export default class MealTable extends React.Component {
	constructor() {
		super();
		this.state = {
			add    : false,
			update : false,
			focus  : false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.setState({ update: !this.state.update });
		}
	}

	flipAdd = async () => {
		await this.setState({
			add : !this.state.add
		});
		this.update();
	};

	update = () => {
		this.props.updateNutrients();
	};

	round = (value, precision) => {
		return Math.round(value * (1 / precision)) / (1 / precision);
	};

	onSubmit = (ingredient) => {
		fetch('http://localhost:8080/nutrition/meals/edit/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				mealId : ingredient.mealId,
				_id    : ingredient._id,
				weight : ingredient.weight
			})
		}).then(() => {
			this.update();
		});
	};

	submitStatus = (ingredient) => {
		fetch('http://localhost:8080/nutrition/meals/remove/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				mealId       : ingredient.mealId,
				ingredientId : ingredient._id
			})
		}).then(() => {
			this.update();
		});
	};

	changeFocus = async () => {
		await this.setState({ focus: true });
		this.setState({ focus: false });
	};

	addIngredient = (ingredient) => {
		if (!ingredient._id) {
			const requestOptions = {
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
			};
			fetch('http://localhost:8080/nutrition/ingredients/add/', requestOptions)
				.then((response) => response.json())
				.then((data) => {
					const requestOptions = {
						method  : 'POST',
						headers : {
							'Content-Type' : 'application/json',
							'auth-token'   : localStorage.getItem('authToken')
						},
						body    : JSON.stringify({
							mealId     : ingredient.mealId === '' ? undefined : ingredient.mealId,
							ingredient : {
								ingredientId : data._id,
								weight       : ingredient.weight
							}
						})
					};
					fetch('http://localhost:8080/nutrition/meals/', requestOptions);
				})
				.then(() => {
					this.update();
				});
		} else {
			const requestOptions = {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'auth-token'   : localStorage.getItem('authToken')
				},
				body    : JSON.stringify({
					mealId     : ingredient.mealId === '' ? undefined : ingredient.mealId,
					ingredient : {
						ingredientId : ingredient._id,
						weight       : ingredient.weight
					}
				})
			};
			fetch('http://localhost:8080/nutrition/meals/', requestOptions).then(() => {
				this.update();
			});
		}
	};

	render() {
		let meal = [];
		let summary = {
			name         : 'Total',
			weight       : 0,
			fat          : 0,
			carbohydrate : 0,
			protein      : 0,
			ethanol      : 0
		};
		for (let i = 0; i < this.props.meal.ingredients.length; i++) {
			meal.push(
				<IngredientRow
					key={this.props.meal.ingredients[i]._id}
					colours={this.props.colours}
					ingredient={this.props.meal.ingredients[i]}
					update={this.update}
					changeFocus={this.changeFocus}
					focus={this.state.focus}
					onSubmit={this.onSubmit}
					submitStatus={this.submitStatus}
					mealId={this.props.meal._id}
					hasWeight={true}
				/>
			);
			const weight = this.props.meal.ingredients[i].weight;
			summary.weight += weight;
			summary.fat += weight * this.props.meal.ingredients[i].fat / 100;
			summary.carbohydrate += weight * this.props.meal.ingredients[i].carbohydrate / 100;
			summary.protein += weight * this.props.meal.ingredients[i].protein / 100;
			summary.ethanol += weight * this.props.meal.ingredients[i].ethanol / 100;
		}
		return (
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
					</tr>
					{meal}
					<IngredientRow
						key={'adder'}
						colours={this.props.colours}
						update={this.flipAdd}
						changeFocus={this.changeFocus}
						mealId={this.props.meal._id}
						focus={this.state.focus}
						onSubmit={this.addIngredient}
						isNew={true}
						hasWeight={true}
						isNewMeal={true}
						cancel={this.flipAdd}
					/>
					<IngredientRow
						key={'summary'}
						colours={this.props.colours}
						ingredient={summary}
						update={this.update}
						hasWeight={true}
						isSummary={true}
					/>
				</tbody>
			</table>
		);
	}
}
