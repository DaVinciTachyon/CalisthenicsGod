import React from 'react';
import '../Main.css';

export default class ProfileEditor extends React.Component {
	constructor() {
		super();
		this.state = {
			calorieMode: 'maintenance',
			calorieOffset: 0,
			currentOffset: 0
		};
	}

	componentDidMount() {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/user/calorieOffset', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					currentOffset: data.calorieOffset
				});
				if (data.calorieOffset > 0)
					this.setState({
						calorieMode: 'bulk',
						calorieOffset: data.calorieOffset
					});
				else if (data.calorieOffset < 0)
					this.setState({
						calorieMode: 'deficit',
						calorieOffset: -1 * data.calorieOffset
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
				currentOffset: this.state.calorieOffset
			});
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<form className="centreMe" onSubmit={this.editProfile}>
					<select onChange={this.calorieModeChange}>
						<option value="maintenance" selected={this.state.calorieMode === 'maintenace'}>
							Maintenance
						</option>
						<option value="deficit" selected={this.state.calorieMode === 'deficit'}>
							Deficit
						</option>
						<option value="bulk" selected={this.state.calorieMode === 'bulk'}>
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
					<input type="submit" value="Edit Profile" />
				</form>
			</div>
		);
	}
}
