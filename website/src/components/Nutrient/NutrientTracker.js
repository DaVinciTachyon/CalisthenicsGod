import React from 'react';
import '../Main.css';
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
			update          : false,
			showIngredients : false,
			showMeals       : false
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	update = () => {
		this.setState({ update: !this.state.update });
	};

	showIngredients = () => {
		this.setState({ showIngredients: !this.state.showIngredients });
	};

	showMeals = () => {
		this.setState({ showMeals: !this.state.showMeals });
	};

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<div className="card">
					<NutrientSummary colours={this.state.colours} update={this.state.update} />
				</div>
				<div className="card relative">
					<div id="floatingButtons">
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
					</div>
					<NutrientDay
						colours={this.state.colours}
						update={this.state.update}
						updateNutrients={this.update}
					/>
				</div>
			</div>
		);
	}
}
