import React from 'react';
import '../Main.css';

export default class NutrientAdder extends React.Component {
	constructor() {
		super();
		this.state = {
			fat: 0,
			carb: 0,
			prot: 0,
			eth: 0,
			name: ''
		};
	}

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

	addMacros = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				food: [
					{
						name: this.state.name,
						fat: this.state.fat,
						carbohydrate: this.state.carb,
						protein: this.state.prot,
						ethanol: this.state.eth
					}
				]
			})
		};
		fetch('http://localhost:8080/nutrients/food', requestOptions).then(() => {
			this.props.addMacros();
		});
		this.setState({
			name: '',
			fat: 0,
			carb: 0,
			prot: 0,
			eth: 0
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<form className="centreMe" onSubmit={this.addMacros}>
					<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.nameChange.bind(this)}
						className="input"
					/>
					<input
						name="fat"
						type="number"
						min="0"
						step="0.1"
						value={this.state.fat}
						onChange={this.fatChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.fatLight }}
					/>
					<input
						name="carb"
						type="number"
						min="0"
						step="0.1"
						value={this.state.carb}
						onChange={this.carbChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.carbLight }}
					/>
					<input
						name="prot"
						type="number"
						min="0"
						step="0.1"
						value={this.state.prot}
						onChange={this.protChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.protLight }}
					/>
					<input
						name="eth"
						type="number"
						min="0"
						step="0.1"
						value={this.state.eth}
						onChange={this.ethChange.bind(this)}
						className="numInput input"
						style={{ background: this.props.ethLight }}
					/>
					<input type="submit" value="Add" />
				</form>
			</div>
		);
	}
}
