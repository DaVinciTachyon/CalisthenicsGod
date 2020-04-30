import React from 'react';
import '../Main.css';
import NutrientAdder from './NutrientAdder';
import NutrientSummary from './NutrientSummary';
import NutrientDay from './NutrientDay';

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
			update: false
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	addMacros = () => {
		this.setState({ update: !this.state.update });
	};

	render() {
		return (
			<div style={{ padding: '100px' }}>
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
				<NutrientAdder
					fatLight={this.state.fatLight}
					carbLight={this.state.carbLight}
					protLight={this.state.protLight}
					ethLight={this.state.ethLight}
					addMacros={this.addMacros}
				/>
				<NutrientDay
					fatLight={this.state.fatLight}
					carbLight={this.state.carbLight}
					protLight={this.state.protLight}
					ethLight={this.state.ethLight}
					update={this.state.update}
				/>
			</div>
		);
	}
}
