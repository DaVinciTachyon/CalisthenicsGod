import React from 'react';
import '../Main.css';

export default class MeasurementSummary extends React.Component {
	constructor() {
		super();
		this.state = {
			weight: 0
		};
	}

	componentDidMount() {
		this.getMeasurements();
	}

	componentWillReceiveProps() {
		this.getMeasurements();
	}

	getMeasurements = () => {
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
	};

	render() {
		return (
			<div className="card alignCentre">
				<table className="centreMe">
					<tbody>
						<tr>
							<td>Weight</td>
							<td>{this.state.weight}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
