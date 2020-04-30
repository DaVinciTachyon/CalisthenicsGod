import React from 'react';
import '../Main.css';
import MeasurementAdder from './MeasurementAdder';
import MeasurementSummary from './MeasurementSummary';

export default class MeasurementTracker extends React.Component {
	constructor() {
		super();
		this.state = {
			update: false
		};
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
				<MeasurementAdder addMeasurement={this.addMeasurement} />
				<MeasurementSummary update={this.state.update} />
			</div>
		);
	}
}
