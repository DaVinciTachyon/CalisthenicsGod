import React from 'react';
import '../Main.css';
import MealTable from './MealTable';
import IngredientRow from './IngredientRow';

export default class NutrientDay extends React.Component {
	constructor() {
		super();
		this.state = {
			meals       : [],
			newMeal     : false,
			update      : false,
			mealId      : '',
			presetMeals : []
		};
	}

	componentDidMount() {
		this.getMeals();
		this.getPresetMeals();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.setState({ update: !this.state.update });
			this.getPresetMeals();
			this.getMeals();
		}
	}

	getMeals = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/nutrition/meals/today/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let meals = Object.assign({}, state.meals);
					meals = data.meals;
					return { meals };
				});
			});
	};

	update = () => {
		this.getMeals();
		this.props.updateNutrients();
		this.setState({ update: !this.state.update });
	};

	flipNewMeal = () => {
		this.setState({
			newMeal : !this.state.newMeal
		});
	};

	mealChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.meal;
		this.setState({ mealId: input });
	};

	getPresetMeals = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/nutrition/meals/preset/names/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let presetMeals = Object.assign({}, state.presetMeals);
					presetMeals = data.names;
					return { presetMeals };
				});
			});
	};

	selectMeal = (evt) => {
		evt.preventDefault();
		if (this.state.mealId === '') this.flipNewMeal();
		else {
			const requestOptions = {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'auth-token'   : localStorage.getItem('authToken')
				},
				body    : JSON.stringify({
					_id : this.state.mealId
				})
			};
			fetch('http://localhost:8080/nutrition/meals/addPreset/', requestOptions).then(() => {
				this.getMeals();
				this.setState({
					mealId : ''
				});
			});
		}
	};

	addIngredient = (ingredient) => {
		console.log(ingredient);
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
							mealId     : ingredient.mealId,
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
					this.flipNewMeal();
				});
		} else {
			const requestOptions = {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'auth-token'   : localStorage.getItem('authToken')
				},
				body    : JSON.stringify({
					mealId     : ingredient.mealId,
					ingredient : {
						ingredientId : ingredient._id,
						weight       : ingredient.weight
					}
				})
			};
			fetch('http://localhost:8080/nutrition/meals/', requestOptions).then(() => {
				this.update();
				this.flipNewMeal();
			});
		}
	};

	render() {
		let meals = [];
		for (let i = 0; i < this.state.meals.length; i++) {
			meals.push(
				<div key={i}>
					<MealTable
						colours={this.props.colours}
						meal={this.state.meals[i]}
						updateNutrients={this.update}
						update={this.state.update}
					/>
					<br />
				</div>
			);
		}
		let presetMeals = [];
		for (let i = 0; i < this.state.presetMeals.length; i++) {
			presetMeals.push(
				<option key={this.state.presetMeals[i]._id} value={this.state.presetMeals[i]._id}>
					{this.state.presetMeals[i].name}
				</option>
			);
		}
		return (
			<div className="alignCentre">
				{meals}
				{!this.state.newMeal && (
					<div>
						<form onSubmit={this.selectMeal.bind(this)}>
							<select name="meal" onChange={this.mealChange.bind(this)}>
								<option value="" selected={this.state.mealId === ''}>
									New Meal
								</option>
								{presetMeals}
							</select>
							<input type="submit" value="Select" />
						</form>
					</div>
				)}
				{this.state.newMeal && (
					<div>
						<IngredientRow
							key={'adder'}
							colours={this.props.colours}
							update={() => {
								this.update();
								this.flipNewMeal();
							}}
							changeFocus={() => {}}
							focus={this.state.focus}
							onSubmit={this.addIngredient}
							isNew={true}
							hasWeight={true}
							isNewMeal={true}
							cancel={this.flipNewMeal}
						/>
					</div>
				)}
			</div>
		);
	}
}
