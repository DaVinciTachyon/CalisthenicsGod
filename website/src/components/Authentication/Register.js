import React from 'react';
import '../Main.css';

export default class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			weight: 0,
			gender: 'male',
			birthDate: '',
			error: ''
		};
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
				password: this.state.password,
				weight: this.state.weight,
				gender: this.state.gender,
				birthDate: this.state.birthDate
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

	handleWeightChange(evt) {
		this.setState({
			weight: evt.target.value
		});
	}

	handleGenderChange(evt) {
		this.setState({
			gender: evt.target.value
		});
	}

	handleBirthDateChange(evt) {
		this.setState({
			birthDate: evt.target.value
		});
	}

	dismissError() {
		this.setState({ error: '' });
	}

	render() {
		return (
			<div className="center">
				<form onSubmit={this.handleSubmit.bind(this)} className="signCard card">
					{this.state.error && (
						<h3 data-test="error" onClick={this.dismissError.bind(this)}>
							<button onClick={this.dismissError.bind(this)}>✖</button>
							{this.state.error}
						</h3>
					)}
					<div className="center">
						<input
							id="name"
							className="formElement"
							type="text"
							value={this.state.name}
							onChange={this.handleNameChange.bind(this)}
							placeholder="Name"
							required
						/>
					</div>
					<div className="center">
						<input
							id="email"
							className="formElement"
							type="text"
							value={this.state.email}
							onChange={this.handleEmailChange.bind(this)}
							placeholder="Email"
							required
						/>
					</div>
					<div className="center">
						<input
							id="password"
							className="formElement"
							type="password"
							value={this.state.password}
							onChange={this.handlePasswordChange.bind(this)}
							placeholder="Password"
						/>
					</div>
					<div className="center">
						<input
							id="weight"
							className="formElement"
							type="number"
							step="0.1"
							min="0"
							value={this.state.weight}
							onChange={this.handleWeightChange.bind(this)}
							placeholder="Weight"
							required
						/>
					</div>
					<div className="center">
						<select name="gender" onChange={this.handleGenderChange.bind(this)} required>
							<option value="male" selected>
								Male
							</option>
							<option value="female">Female</option>
						</select>
					</div>
					<div className="center">
						<input
							id="birthDate"
							className="formElement"
							type="date"
							value={this.state.birthDate}
							onChange={this.handleBirthDateChange.bind(this)}
							required
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
