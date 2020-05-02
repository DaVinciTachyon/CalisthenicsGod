import React from 'react';
import '../Main.css';
import MeasurementSummary from './MeasurementSummary';
import MeasurementHistory from './MeasurementHistory';

export default class MeasurementTracker extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<MeasurementSummary />
				<MeasurementHistory />
			</div>
		);
	}
}
