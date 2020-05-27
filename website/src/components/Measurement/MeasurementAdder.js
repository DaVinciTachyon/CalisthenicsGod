import React from 'react';

export default class MeasurementAdder extends React.Component {
	constructor() {
		super();
		this.state = {
			weight       : 0,
			height       : 0,
			waist        : 0,
			hips         : 0,
			rightBicep   : 0,
			leftBicep    : 0,
			rightForearm : 0,
			leftForearm  : 0,
			shoulders    : 0,
			chest        : 0,
			neck         : 0
		};
	}

	weightChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.weight;
		this.setState({ weight: input });
	};

	heightChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.height;
		this.setState({ height: input });
	};

	waistChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.waist;
		this.setState({ waist: input });
	};

	hipsChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.hips;
		this.setState({ hips: input });
	};

	rightBicepChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.rightBicep;
		this.setState({ rightBicep: input });
	};

	leftBicepChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.leftBicep;
		this.setState({ leftBicep: input });
	};

	rightForearmChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.rightForearm;
		this.setState({ rightForearm: input });
	};

	leftForearmChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.leftForearm;
		this.setState({ leftForearm: input });
	};

	shouldersChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.shoulders;
		this.setState({ shoulders: input });
	};

	chestChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.chest;
		this.setState({ chest: input });
	};

	neckChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.neck;
		this.setState({ neck: input });
	};

	submitMeasurement = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				weight       : this.state.weight > 0 ? this.state.weight : undefined,
				height       : this.state.height > 0 ? this.state.height : undefined,
				waist        : this.state.waist > 0 ? this.state.waist : undefined,
				hips         : this.state.hips > 0 ? this.state.hips : undefined,
				rightBicep   : this.state.rightBicep > 0 ? this.state.rightBicep : undefined,
				leftBicep    : this.state.leftBicep > 0 ? this.state.leftBicep : undefined,
				rightForearm : this.state.rightForearm > 0 ? this.state.rightForearm : undefined,
				leftForearm  : this.state.leftForearm > 0 ? this.state.leftForearm : undefined,
				shoulders    : this.state.shoulders > 0 ? this.state.shoulders : undefined,
				chest        : this.state.chest > 0 ? this.state.chest : undefined,
				neck         : this.state.neck > 0 ? this.state.neck : undefined
			})
		};
		fetch('http://localhost:8080/measurement/', requestOptions).then(() => {
			this.props.addMeasurement();
		});
	};

	render() {
		return (
			<form onSubmit={this.submitMeasurement} className="alignCentre">
				<label for="weight">Weight</label>
				<input
					name="weight"
					type="number"
					min="0"
					step="0.1"
					value={this.state.weight}
					onChange={this.weightChange.bind(this)}
					className="input"
				/>
				<label for="height">Height</label>
				<input
					name="height"
					type="number"
					min="0"
					step="0.1"
					value={this.state.height}
					onChange={this.heightChange.bind(this)}
					className="input"
				/>
				<label for="waist">Waist</label>
				<input
					name="waist"
					type="number"
					min="0"
					step="0.1"
					value={this.state.waist}
					onChange={this.waistChange.bind(this)}
					className="input"
				/>
				<label for="hips">Hips</label>
				<input
					name="hips"
					type="number"
					min="0"
					step="0.1"
					value={this.state.hips}
					onChange={this.hipsChange.bind(this)}
					className="input"
				/>

				<label for="rightBicep">Right Bicep</label>
				<input
					name="rightBicep"
					type="number"
					min="0"
					step="0.1"
					value={this.state.rightBicep}
					nge={this.rightBicepChange.bind(this)}
					className="input"
				/>

				<label for="leftBicep">Left Bicep</label>
				<input
					name="leftBicep"
					type="number"
					min="0"
					step="0.1"
					value={this.state.leftBicep}
					onChange={this.leftBicepChange.bind(this)}
					className="input"
				/>

				<label for="rightForearm">Right Forearm</label>
				<input
					name="rightForearm"
					type="number"
					min="0"
					step="0.1"
					value={this.state.rightForearm}
					onChange={this.rightForearmChange.bind(this)}
					className="input"
				/>

				<label for="leftForearm">Left Forearm</label>
				<input
					name="leftForearm"
					type="number"
					min="0"
					step="0.1"
					value={this.state.leftForearm}
					onChange={this.leftForearmChange.bind(this)}
					className="input"
				/>

				<label for="shoulders">Shoulders</label>
				<input
					name="shoulders"
					type="number"
					min="0"
					step="0.1"
					value={this.state.shoulders}
					onChange={this.shouldersChange.bind(this)}
					className="input"
				/>

				<label for="chest">Chest</label>
				<input
					name="chest"
					type="number"
					min="0"
					step="0.1"
					value={this.state.chest}
					onChange={this.chestChange.bind(this)}
					className="input"
				/>

				<label for="neck">Neck</label>
				<input
					name="neck"
					type="number"
					min="0"
					step="0.1"
					value={this.state.neck}
					onChange={this.neckChange.bind(this)}
					className="input"
				/>

				<input type="submit" value="Add Measurements" />
			</form>
		);
	}
}
