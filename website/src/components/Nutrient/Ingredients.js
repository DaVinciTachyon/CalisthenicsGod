import React from 'react';
import '../Main.css';
import IngredientAdder from './IngredientsAdder';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
	constructor() {
		super();
		this.state = {
			update: false
		};
	}

	update = () => {
		this.setState({ update: !this.state.update });
		this.props.update();
	};

	render() {
		return (
			<div>
				<IngredientAdder
					fatLight={this.props.fatLight}
					carbLight={this.props.carbLight}
					protLight={this.props.protLight}
					ethLight={this.props.ethLight}
					update={this.update}
				/>
				<IngredientList
					fatLight={this.props.fatLight}
					carbLight={this.props.carbLight}
					protLight={this.props.protLight}
					ethLight={this.props.ethLight}
					update={this.state.update}
				/>
			</div>
		);
	}
}
