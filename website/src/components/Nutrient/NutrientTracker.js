import React from 'react';
import '../Main.css';
import NutrientSummary from './NutrientSummary';
import NutrientDay from './NutrientDay';
import Ingredients from './Ingredients';
import Modal from 'react-modal';

export default class NutrientTracker extends React.Component {
	constructor() {
		super();
		this.state = {
			fatDark: '#ffd433',
			fatLight: '#ffe582',
			carbDark: '#ff3f3f',
			carbLight: '#ff9999',
			protDark: '#3fafff',
			protLight: '#99f1ff',
			ethDark: '#35ff38',
			ethLight: '#82ff84',
			update: false,
			showIngredients: false
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

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<div className="card">
					<NutrientSummary
						fatLight={this.state.fatLight}
						carbLight={this.state.carbLight}
						protLight={this.state.protLight}
						ethLight={this.state.ethLight}
						fatDark={this.state.fatDark}
						carbDark={this.state.carbDark}
						protDark={this.state.protDark}
						ethDark={this.state.ethDark}
						update={this.state.update}
					/>
				</div>
				<div className="card relative">
					<button id="seeIngredients" onClick={this.showIngredients}>
						+
					</button>
					<Modal
						isOpen={this.state.showIngredients}
						onRequestClose={this.showIngredients}
						contentLabel="Full Calorie View"
					>
						<div className="alignCentre">
							<Ingredients
								fatLight={this.state.fatLight}
								carbLight={this.state.carbLight}
								protLight={this.state.protLight}
								ethLight={this.state.ethLight}
								update={this.update}
							/>
							<button onClick={this.showIngredients}>Cancel</button>
						</div>
					</Modal>
					<NutrientDay
						fatLight={this.state.fatLight}
						carbLight={this.state.carbLight}
						protLight={this.state.protLight}
						ethLight={this.state.ethLight}
						update={this.update}
					/>
				</div>
			</div>
		);
	}
}
