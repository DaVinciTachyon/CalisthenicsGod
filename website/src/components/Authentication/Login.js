import React from 'react';
import '../Main.css';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			error: ''
		};

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
		if (!this.state.email) return this.setState({ error: 'Email is required' });
		if (!this.state.password) return this.setState({ error: 'Password is required' });
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		};
		fetch('http://localhost:8080/auth/login', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data['auth-token']) {
					localStorage.setItem('authToken', data['auth-token']);
					window.location.reload(false);
				}
				this.setState({ error: data.error });
			})
			.catch((err) => console.error(err));
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
						<input className="primaryButton formElement" type="submit" value="Login" />
					</div>
					<div className="center">
						<a className="secondaryButton formElement" href="/register">
							Register
						</a>
					</div>
				</form>
			</div>
		);
	}
}
