import React from 'react';
import NutrientSummary from './NutrientSummary';
import NutrientDay from './NutrientDay';
import Ingredients from './Ingredients';
import Meals from './Meals';
import Modal from '../Modal';

export default class NutrientTracker extends React.Component {
	constructor() {
		super();
		this.state = {
			colours         : {
				fatDark   : '#ffd433',
				fatLight  : '#ffe582',
				carbDark  : '#ff3f3f',
				carbLight : '#ff9999',
				protDark  : '#3fafff',
				protLight : '#99f1ff',
				ethDark   : '#35ff38',
				ethLight  : '#82ff84'
			},
			currentMacros   : {
				fat          : 0,
				carbohydrate : 0,
				protein      : 0,
				ethanol      : 0
			},
			macroDensities  : {
				fat          : 9,
				carbohydrate : 4,
				protein      : 4,
				ethanol      : 7
			},
			update          : false,
			showIngredients : false,
			showMeals       : false
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
		this.getMacronutrientDensities();
	}

	update = (currentMacros) => {
		this.setState({ currentMacros: currentMacros });
	};

	render() {
		return (
			<div className="page">
				<div className="card">
					<NutrientSummary
						colours={this.state.colours}
						currentMacros={this.state.currentMacros}
						macroDensities={this.state.macroDensities}
					/>
				</div>
				<NutrientDay
					colours={this.state.colours}
					macroDensities={this.state.macroDensities}
					updateNutrients={this.update}
					update={this.state.update}
				/>
				{/* <div id="floatingButtons">
					<button onClick={this.showIngredients}>I</button>
					<Modal isOpen={this.state.showIngredients} toggle={this.showIngredients}>
						<div className="alignCentre">
							<Ingredients colours={this.state.colours} update={this.update} />
							<button onClick={this.showIngredients}>Exit</button>
						</div>
					</Modal>
					<button onClick={this.showMeals}>M</button>
					<Modal isOpen={this.state.showMeals} toggle={this.showMeals}>
						<div className="alignCentre">
							<Meals colours={this.state.colours} update={this.update} />
							<button onClick={this.showMeals}>Exit</button>
						</div>
					</Modal>
				</div> */}
			</div>
		);
	}

	showIngredients = () => {
		this.setState({ showIngredients: !this.state.showIngredients });
	};

	showMeals = () => {
		this.setState({ showMeals: !this.state.showMeals });
	};

	getMacronutrientDensities = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/nutrition/macronutrientDensities', requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					macroDensities : {
						fat  : data.fat,
						carb : data.carbohydrate,
						prot : data.protein,
						eth  : data.ethanol
					}
				})
			);
	};
}
