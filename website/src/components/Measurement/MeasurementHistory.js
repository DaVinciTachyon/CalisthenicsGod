import React from 'react';
import '../Main.css';

export default class MeasurementHistory extends React.Component {
	constructor() {
		super();
		this.state = {
			weightHistory: []
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/measurement/weight/history', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let weightHistory = Object.assign({}, state.weightHistory);
					weightHistory = data.weight;
					return { weightHistory };
				});
			});
	}

	addWeightHistory = () => {
		return this.state.weightHistory.map((weight) => {
			let date = new Date(weight.date);
			return (
				<tr key={weight._id}>
					<td>
						{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}-{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
					</td>
					<td>{weight.value}</td>
				</tr>
			);
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<table className="centreMe">
					<tbody>
						<tr>
							<th>Date</th>
							<th>Weight</th>
						</tr>
						{this.addWeightHistory()}
					</tbody>
				</table>
			</div>
		);
	}
}
