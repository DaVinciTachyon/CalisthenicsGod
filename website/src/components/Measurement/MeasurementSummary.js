import React from 'react';
import '../Main.css';

export default class MeasurementSummary extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	componentDidMount() {
		this.getMeasurements();
	}

	componentWillReceiveProps() {
		this.getMeasurements();
	}

	getMeasurements = () => {};

	render() {
		return <div className="card alignCentre">Summary</div>;
	}
}
