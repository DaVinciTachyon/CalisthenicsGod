import React from 'react';
import WeightAdder from './WeightAdder';

export default class HomePage extends React.Component {
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
				<WeightAdder />
			</div>
		);
	}
}
