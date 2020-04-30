import React from 'react';
import '../Main.css';

export default class ProfileEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			calorieMode: 'maintenance'
		};
	}

	calorieModeChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.calorieMode;
		this.setState({ calorieMode: input });
	};

	editProfile = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				calorieMode: this.state.calorieMode
			})
		};
		fetch('http://localhost:8080/user/calorieMode', requestOptions).then(() => {
			this.props.editProfile();
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<form className="centreMe" onSubmit={this.editProfile}>
					<select onChange={this.calorieModeChange}>
						<option value="maintenance" defaultValue>
							Maintenance
						</option>
						<option value="deficit">Deficit</option>
						<option value="bulk">Bulk</option>
					</select>
					<input type="submit" value="Edit Profile" />
				</form>
			</div>
		);
	}
}
