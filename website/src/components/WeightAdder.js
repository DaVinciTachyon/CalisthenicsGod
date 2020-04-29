import React from 'react';

export default class WeightAdder extends React.Component {
	constructor() {
		super();
		this.state = {
			weight: 0
		};
	}

	weightChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.weight;
		this.setState({ weight: input });
	};

	submitWeight = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				weight: this.state.weight
			})
		};
		fetch('http://localhost:8080/user/weight', requestOptions);
		this.setState({
			weight: 0
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<form className="centreMe" onSubmit={this.submitWeight}>
					<input
						name="weight"
						type="number"
						min="0"
						step="0.1"
						value={this.state.weight}
						onChange={this.weightChange.bind(this)}
						className="numInput input"
					/>
					<input type="submit" value="Add Weight" />
				</form>
			</div>
		);
	}
}
