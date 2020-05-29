import React from 'react';
import MealTable from './MealTable';
import IngredientRow from './IngredientRow';

export default class NutrientDay extends React.Component {
	constructor() {
		super();
		this.state = {
			meals       : [],
			mealId      : '',
			presetMeals : [],
			newMeal     : false,
			update      : false
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

	render() {
		let meals = [];
		for (let i = 0; i < this.state.meals.length; i++) {
			meals.push(
				<MealTable
					key={i}
					colours={this.props.colours}
					meal={this.state.meals[i]}
					macroDensities={this.props.macroDensities}
					addNutrient={this.addIngredientToMeal}
					removeNutrient={this.removeIngredientFromMeal}
					editNutrient={this.editIngredientInMeal}
					update={this.state.update}
				/>
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
					<div class="ingredientTable">
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
							macroDensities={this.props.macroDensities}
							isNew={true}
							hasWeight={true}
							isNewMeal={true}
							noToggle={true}
							cancel={this.flipNewMeal}
						/>
					</div>
				)}
			</div>
		);
	}

	addIngredient = async (ingredient) => {
		let newId = '';
		if (!ingredient._id) {
			const response = await fetch('http://localhost:8080/nutrition/ingredients/add/', {
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
			});
			const data = await response.json();
			newId = data._id;
		} else newId = ingredient._id;

		await fetch('http://localhost:8080/nutrition/meals/', {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				ingredient : {
					ingredientId : newId,
					weight       : ingredient.weight
				}
			})
		});
		this.addIngredientToMeal({
			ingredient : {
				_id          : newId,
				name         : ingredient.name,
				weight       : ingredient.weight,
				fat          : ingredient.fat,
				carbohydrate : ingredient.carb,
				protein      : ingredient.prot,
				ethanol      : ingredient.eth
			}
		});
		this.update();
	};

	update = () => {
		this.setState({
			mealId : ''
		});
	};

	addIngredientToMeal = (ingredient) => {
		let meals = Array.from(this.state.meals);
		const mealI = meals.findIndex((val) => val._id === ingredient.mealId);
		if (mealI === -1)
			meals.push({
				ingredients : [
					ingredient.ingredient
				]
			});
		else {
			let ingredients = Array.from(meals[mealI].ingredients);
			ingredients.push(ingredient.ingredient);
			meals[mealI].ingredients = ingredients;
		}
		this.setState({ meals: meals });
		this.updateOverallMacros();
	};

	removeIngredientFromMeal = (ingredient) => {
		let meals = Array.from(this.state.meals);
		const mealI = meals.findIndex((val) => val._id === ingredient.mealId);
		if (meals[mealI].ingredients.length === 1) {
			meals = meals.filter((val) => val._id !== ingredient.mealId);
		} else {
			let ingredients = Array.from(meals[mealI].ingredients);
			ingredients = ingredients.filter((val) => val._id !== ingredient._id);
			meals[mealI].ingredients = ingredients;
		}
		this.setState({ meals: meals });
		this.updateOverallMacros();
	};

	editIngredientInMeal = (ingredient) => {
		console.log(ingredient);
		let meals = Array.from(this.state.meals);
		const mealI = meals.findIndex((val) => val._id === ingredient.mealId);
		let ingredients = Array.from(meals[mealI].ingredients);
		const ingredientI = ingredients.findIndex((val) => val._id === ingredient.ingredient._id);
		ingredients[ingredientI].weight = ingredient.ingredient.weight;
		meals[mealI].ingredients = ingredients;
		this.setState({ meals: meals });
		this.updateOverallMacros();
	};

	updateOverallMacros = () => {
		let currentMacros = {
			fat          : 0,
			carbohydrate : 0,
			protein      : 0,
			ethanol      : 0
		};
		for (let i = 0; i < this.state.meals.length; i++) {
			for (let j = 0; j < this.state.meals[i].ingredients.length; j++) {
				const weight = this.state.meals[i].ingredients[j].weight / 100;
				currentMacros.fat += this.state.meals[i].ingredients[j].fat * weight;
				currentMacros.carbohydrate +=
					this.state.meals[i].ingredients[j].carbohydrate * weight;
				currentMacros.protein += this.state.meals[i].ingredients[j].protein * weight;
				currentMacros.ethanol += this.state.meals[i].ingredients[j].ethanol * weight;
			}
		}
		this.props.updateNutrients(currentMacros);
	};

	getMeals = async () => {
		const response = await fetch('http://localhost:8080/nutrition/meals/today/', {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		});
		const data = await response.json();
		let meals = Object.assign({}, this.state.meals);
		meals = data.meals;
		this.setState({ meals: meals });
		this.updateOverallMacros();
	};

	getPresetMeals = async () => {
		const response = await fetch('http://localhost:8080/nutrition/meals/preset/names/', {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		});
		const data = await response.json();
		let presetMeals = Object.assign({}, this.state.presetMeals);
		presetMeals = data.names;
		this.setState({ presetMeals: presetMeals });
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

	selectMeal = async (evt) => {
		evt.preventDefault();
		if (this.state.mealId === '') this.flipNewMeal();
		else {
			await fetch('http://localhost:8080/nutrition/meals/addPreset/', {
				method  : 'POST',
				headers : {
					'Content-Type' : 'application/json',
					'auth-token'   : localStorage.getItem('authToken')
				},
				body    : JSON.stringify({
					_id : this.state.mealId
				})
			});
			this.update();
			this.getMeals();
		}
	};
}
