import React from 'react';
import '../Main.css';
import Modal from 'react-modal';
import MeasurementAdder from './MeasurementAdder';

export default class MeasurementSummary extends React.Component {
	constructor() {
		super();
		this.state = {
			weight: 0,
			height: 0,
			waist: 0,
			hips: 0,
			rightBicep: 0,
			leftBicep: 0,
			rightForearm: 0,
			leftForearm: 0,
			shoulders: 0,
			chest: 0,
			neck: 0,
			newMeasurements: false
		};
	}

	componentDidMount() {
		this.getMeasurements();
	}

	addMeasurement = () => {
		this.newMeasurements();
		this.getMeasurements();
		this.props.addMeasurement();
	};

	newMeasurements = () => {
		this.setState({
			newMeasurements: !this.state.newMeasurements
		});
	};

	getMeasurements = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/measurement/', requestOptions).then((response) => response.json()).then((data) =>
			this.setState({
				weight: data.weight,
				height: data.height,
				waist: data.waist,
				hips: data.hips,
				rightBicep: data.rightBicep,
				leftBicep: data.leftBicep,
				rightForearm: data.rightForearm,
				leftForearm: data.leftForearm,
				shoulders: data.shoulders,
				chest: data.chest,
				neck: data.neck
			})
		);
	};

	render() {
		return (
			<div className="card alignCentre">
				<table className="centreMe">
					<tbody>
						{this.state.weight > 0 && (
							<tr>
								<td>Weight</td>
								<td>{this.state.weight}</td>
							</tr>
						)}
						{this.state.height > 0 && (
							<tr>
								<td>Height</td>
								<td>{this.state.height}</td>
							</tr>
						)}
						{this.state.waist > 0 && (
							<tr>
								<td>Waist</td>
								<td>{this.state.waist}</td>
							</tr>
						)}
						{this.state.hips > 0 && (
							<tr>
								<td>Hips</td>
								<td>{this.state.hips}</td>
							</tr>
						)}
						{this.state.rightBicep > 0 && (
							<tr>
								<td>Right Flexed Bicep</td>
								<td>{this.state.rightBicep}</td>
							</tr>
						)}
						{this.state.leftBicep > 0 && (
							<tr>
								<td>Left Flexed Bicep</td>
								<td>{this.state.leftBicep}</td>
							</tr>
						)}
						{this.state.rightForearm > 0 && (
							<tr>
								<td>Right Forearm</td>
								<td>{this.state.rightForearm}</td>
							</tr>
						)}
						{this.state.leftForearm > 0 && (
							<tr>
								<td>Left Forearm</td>
								<td>{this.state.leftForearm}</td>
							</tr>
						)}
						{this.state.shoulders > 0 && (
							<tr>
								<td>Shoulders</td>
								<td>{this.state.shoulders}</td>
							</tr>
						)}
						{this.state.chest > 0 && (
							<tr>
								<td>Chest</td>
								<td>{this.state.chest}</td>
							</tr>
						)}
						{this.state.neck > 0 && (
							<tr>
								<td>Neck</td>
								<td>{this.state.neck}</td>
							</tr>
						)}
					</tbody>
				</table>
				<br />
				<button onClick={this.newMeasurements}>New Measurements</button>
				<Modal
					isOpen={this.state.newMeasurements}
					onRequestClose={this.newMeasurements}
					contentLabel="New Measurements"
				>
					<div className="alignCentre">
						<MeasurementAdder addMeasurement={this.addMeasurement} />
						<button onClick={this.newMeasurements} className="centreMe">
							Cancel
						</button>
					</div>
				</Modal>
			</div>
		);
	}
}
