import React from 'react';
import '../Main.css';
import MeasurementSummary from './MeasurementSummary';
import MeasurementHistory from './MeasurementHistory';

export default class MeasurementTracker extends React.Component {
	constructor() {
		super();
		this.state = { update: false };
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	addMeasurement = () => {
		this.setState({ update: !this.state.update });
	};

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<MeasurementSummary addMeasurement={this.addMeasurement} />
				<MeasurementHistory update={this.state.update} />
			</div>
		);
	}
}
