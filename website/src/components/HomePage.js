import React from 'react';

export default class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	render() {
		return <div style={{ padding: '100px' }}>Make this a summary page?</div>;
	}
}
