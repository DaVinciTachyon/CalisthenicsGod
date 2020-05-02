import React from 'react';
import '../Main.css';

export default class ProfileEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			calorieMode: 'maintenance',
			calorieOffset: 0,
			currentOffset: 0,
			currentMode: 'maintenance',
			name: '',
			email: '',
			dateJoined: '',
			birthDate: '',
			gender: '',
			maintenanceCalories: 0,
			proteinAmount: 0,
			fatPartition: 0
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/user/', requestOptions).then((response) => response.json()).then((data) => {
			let dateJoined = new Date(data.dateJoined);
			let birthDate = new Date(data.birthDate);
			this.setState({
				name: data.name,
				email: data.email,
				dateJoined: `${dateJoined.getDate()}/${dateJoined.getMonth() + 1}/${dateJoined.getFullYear()}`,
				birthDate: `${birthDate.getDate()}/${birthDate.getMonth() + 1}/${birthDate.getFullYear()}`,
				gender: data.gender,
				maintenanceCalories: data.maintenanceCalories,
				calorieOffset: data.calorieOffset,
				proteinAmount: data.proteinAmount,
				fatPartition: data.fatPartition
			});
			if (data.calorieOffset > 0)
				this.setState({
					calorieMode: 'bulk',
					currentMode: 'bulk',
					calorieOffset: data.calorieOffset,
					currentOffset: data.calorieOffset
				});
			else if (data.calorieOffset < 0)
				this.setState({
					calorieMode: 'deficit',
					currentMode: 'deficit',
					calorieOffset: -1 * data.calorieOffset,
					currentOffset: data.calorieOffset
				});
		});
	}

	calorieModeChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.calorieMode;
		this.setState({ calorieMode: input });
		if (this.state.currentOffset < 0 && input === 'deficit')
			this.setState({ calorieOffset: -1 * this.state.currentOffset });
		else if (this.state.currentOffset > 0 && input === 'bulk')
			this.setState({ calorieOffset: this.state.currentOffset });
		else if (input === 'deficit') this.setState({ calorieOffset: 300 });
		else if (input === 'bulk') this.setState({ calorieOffset: 200 });
		else this.setState({ calorieOffset: 0 });
	};

	calorieOffsetChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.calorieOffset;
		this.setState({ calorieOffset: input });
	};

	editProfile = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') },
			body: JSON.stringify({
				calorieOffset:
					this.state.calorieMode === 'deficit' ? -1 * this.state.calorieOffset : this.state.calorieOffset
			})
		};
		fetch('http://localhost:8080/user/calorieOffset', requestOptions).then(() => {
			this.props.editProfile();
			this.setState({
				currentOffset: this.state.calorieOffset,
				currentMode: this.state.calorieMode
			});
		});
	};

	render() {
		return (
			<div>
				<div className="card alignCentre">
					<form className="centreMe" onSubmit={this.editProfile}>
						<select onChange={this.calorieModeChange}>
							<option value="maintenance" defaultValue={this.state.calorieMode === 'maintenance'}>
								Maintenance
							</option>
							<option value="deficit" defaultValue={this.state.calorieMode === 'deficit'}>
								Deficit
							</option>
							<option value="bulk" defaultValue={this.state.calorieMode === 'bulk'}>
								Bulk
							</option>
						</select>
						{this.state.calorieMode !== 'maintenance' && (
							<input
								type="number"
								value={this.state.calorieOffset}
								min="0"
								step="1"
								onChange={this.calorieOffsetChange}
							/>
						)}
						<br />
						<input type="submit" value="Edit Profile" />
					</form>
				</div>
				<div className="card alignCentre">
					<table className="centreMe">
						<tbody>
							<tr>
								<td>Name</td>
								<td>{this.state.name}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>{this.state.email}</td>
							</tr>
							<tr>
								<td>Maintenance Calories</td>
								<td>{this.state.maintenanceCalories}</td>
							</tr>
							<tr>
								<td>Calorie Mode</td>
								<td>{this.state.currentMode}</td>
							</tr>
							<tr>
								<td>Calorie Offset</td>
								<td>{this.state.currentOffset}</td>
							</tr>
							<tr>
								<td>Protein Amount</td>
								<td>{this.state.proteinAmount} g/kg</td>
							</tr>
							<tr>
								<td>Fat Partition</td>
								<td>{this.state.fatPartition * 100}%</td>
							</tr>
							<tr>
								<td>Gender</td>
								<td>{this.state.gender}</td>
							</tr>
							<tr>
								<td>Birth Date</td>
								<td>{this.state.birthDate}</td>
							</tr>
							<tr>
								<td>Date Joined</td>
								<td>{this.state.dateJoined}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
