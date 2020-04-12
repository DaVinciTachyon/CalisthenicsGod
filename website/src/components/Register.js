import React from 'react';
import './Main.css';

export default class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			error: ''
		};

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.dismissError = this.dismissError.bind(this);
	}

	componentDidMount() {
		if (localStorage.getItem('authToken')) window.location = '/';
	}

	handleSubmit(evt) {
		evt.preventDefault();
		if (!this.state.name) return this.setState({ error: 'Name is required' });
		if (!this.state.email) return this.setState({ error: 'Email is required' });
		if (!this.state.password) return this.setState({ error: 'Password is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		};
		fetch('http://localhost:8080/auth/register', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.user) window.location = '/login';
				this.setState({ error: data.error });
			});
	}

	handleNameChange(evt) {
		this.setState({
			name: evt.target.value
		});
	}

	handleEmailChange(evt) {
		this.setState({
			email: evt.target.value
		});
	}

	handlePasswordChange(evt) {
		this.setState({
			password: evt.target.value
		});
	}

	dismissError() {
		this.setState({ error: '' });
	}

	render() {
		return (
			<div className="center">
				<form onSubmit={this.handleSubmit} className="signCard card">
					{this.state.error && (
						<h3 data-test="error" onClick={this.dismissError}>
							<button onClick={this.dismissError}>✖</button>
							{this.state.error}
						</h3>
					)}
					<div className="center">
						<input
							id="name"
							className="formElement"
							type="text"
							value={this.state.name}
							onChange={this.handleNameChange}
							placeholder="Name"
						/>
					</div>
					<div className="center">
						<input
							id="email"
							className="formElement"
							type="text"
							value={this.state.email}
							onChange={this.handleEmailChange}
							placeholder="Email"
						/>
					</div>
					<div className="center">
						<input
							id="password"
							className="formElement"
							type="password"
							value={this.state.password}
							onChange={this.handlePasswordChange}
							placeholder="Password"
						/>
					</div>
					<div className="center">
						<input className="primaryButton formElement" type="submit" value="Register" />
					</div>
					<div className="center">
						<a className="secondaryButton formElement" href="/login">
							Login
						</a>
					</div>
				</form>
			</div>
		);
	}
}
