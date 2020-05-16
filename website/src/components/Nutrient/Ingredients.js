import React from 'react';
import '../Main.css';
import IngredientAdder from './IngredientsAdder';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
	constructor() {
		super();
		this.state = {
			update: false,
			newIngredient: false
		};
	}

	update = () => {
		this.setState({ update: !this.state.update });
		this.props.update();
	};

	flipNewIngredient = () => {
		this.setState({ newIngredient: !this.state.newIngredient });
	};

	render() {
		return (
			<div>
				<h3>Available</h3>
				<IngredientList
					colours={this.props.colours}
					update={this.state.update}
					updateIngredients={this.update}
				/>
				{!this.state.newIngredient && <button onClick={this.flipNewIngredient}>New Ingredient</button>}
				{this.state.newIngredient && (
					<div>
						<IngredientAdder
							colours={this.props.colours}
							update={() => {
								this.update();
								this.flipNewIngredient();
							}}
						/>
						<button onClick={this.flipNewIngredient}>Cancel</button>
					</div>
				)}
				<h3>Unavailable</h3>
				<IngredientList
					colours={this.props.colours}
					update={this.state.update}
					updateIngredients={this.update}
					isUnavailable={true}
				/>
			</div>
		);
	}
}
