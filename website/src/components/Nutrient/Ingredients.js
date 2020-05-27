import React from 'react';
import IngredientList from './IngredientList';

export default class Ingredients extends React.Component {
	constructor() {
		super();
		this.state = {
			update        : false,
			newIngredient : false
		};
	}

	update = () => {
		this.setState({ update: !this.state.update });
		this.props.update();
	};

	flipNewIngredient = () => {
		this.setState({ newIngredient: !this.state.newIngredient });
	};

	changeFocus = () => {
		this.setState({ focus: !this.state.focus });
	};

	render() {
		return (
			<div>
				<IngredientList
					colours={this.props.colours}
					update={this.state.update}
					updateIngredients={this.update}
					changeFocus={this.changeFocus}
					focus={this.state.focus}
				/>
				<IngredientList
					colours={this.props.colours}
					update={this.state.update}
					updateIngredients={this.update}
					changeFocus={this.changeFocus}
					focus={this.state.focus}
					isUnavailable={true}
				/>
			</div>
		);
	}
}
