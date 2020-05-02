import React from 'react';
import '../Main.css';

export default class MeasurementAdder extends React.Component {
	constructor() {
		super();
		this.state = {
			weight: 0
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/measurement/weight', requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					weight: data.weight
				})
			);
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
		fetch('http://localhost:8080/measurement/weight', requestOptions).then(() => {
			this.props.addMeasurement();
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
						className="input"
					/>
					<input type="submit" value="Add Weight" />
				</form>
			</div>
		);
	}
}
