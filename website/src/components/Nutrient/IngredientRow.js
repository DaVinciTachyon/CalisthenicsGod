import React from 'react';
import '../Main.css';

export default class IngredientRow extends React.Component {
	constructor() {
		super();
		this.state = { edit: false, name: '', fat: 0, carb: 0, prot: 0, eth: 0 };
	}

	componentDidMount() {
		this.setState({
			name: this.props.ingredient.name,
			fat: this.props.ingredient.fat,
			carb: this.props.ingredient.carbohydrate,
			prot: this.props.ingredient.protein,
			eth: this.props.ingredient.ethanol
		});
	}

	updateIngredient = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				_id: this.props.ingredient._id
			})
		};
		let url = 'http://localhost:8080/nutrition/ingredients/makeUnavailable/';
		if (this.props.isUnavailable) url = 'http://localhost:8080/nutrition/ingredients/makeAvailable/';
		fetch(url, requestOptions).then(() => {
			this.props.update();
		});
	};

	flipEdit = () => {
		this.setState({ edit: !this.state.edit });
	};

	editIngredient = () => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				_id: this.props.ingredient._id,
				name: this.state.name,
				fat: this.state.fat,
				carbohydrate: this.state.carb,
				protein: this.state.prot,
				ethanol: this.state.eth
			})
		};
		fetch('http://localhost:8080/nutrition/ingredients/edit/', requestOptions).then(() => {
			this.props.update();
			this.flipEdit();
		});
	};

	nameChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.name;
		this.setState({ name: input });
	};

	fatChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.fat;
		this.setState({ fat: input });
	};

	carbChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.carb;
		this.setState({ carb: input });
	};

	protChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.prot;
		this.setState({ prot: input });
	};

	ethChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.eth;
		this.setState({ eth: input });
	};

	render() {
		return (
			<tr>
				<td>
					<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.nameChange.bind(this)}
						className="input"
						required
						readOnly={!this.state.edit}
					/>
				</td>
				<td>
					<input
						name="fat"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.fat}
						onChange={this.fatChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.colours.fatLight }}
						readOnly={!this.state.edit}
					/>
				</td>
				<td>
					<input
						name="carb"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.carb}
						onChange={this.carbChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.colours.carbLight }}
						readOnly={!this.state.edit}
					/>
				</td>
				<td>
					<input
						name="prot"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.prot}
						onChange={this.protChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.colours.protLight }}
						readOnly={!this.state.edit}
					/>
				</td>
				<td>
					<input
						name="eth"
						type="number"
						min="0"
						max="100"
						step="0.1"
						value={this.state.eth}
						onChange={this.ethChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.colours.ethLight }}
						readOnly={!this.state.edit}
					/>
				</td>
				{!this.state.edit && (
					<div>
						<td>
							<button onClick={this.flipEdit}>Edit</button>
						</td>
						<td>
							<button onClick={this.updateIngredient}>
								{this.props.isUnavailable && <div>+</div>}
								{!this.props.isUnavailable && <div>×</div>}
							</button>
						</td>
					</div>
				)}
				{this.state.edit && (
					<div>
						<td>
							<button onClick={this.editIngredient}>Submit</button>
						</td>
						<td>
							<button onClick={this.flipEdit}>Cancel</button>
						</td>
					</div>
				)}
			</tr>
		);
	}
}
