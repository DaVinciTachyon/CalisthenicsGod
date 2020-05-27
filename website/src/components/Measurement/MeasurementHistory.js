import React from 'react';
import { Line } from 'react-chartjs-2';

export default class MeasurementHistory extends React.Component {
	constructor() {
		super();
		this.state = {
			chart : {
				labels   : [],
				datasets : [
					{
						label           : 'Weight',
						fill            : false,
						lineTension     : 0.5,
						backgroundColor : 'rgba(75,192,192,1)',
						borderColor     : 'rgba(0,0,0,1)',
						borderWidth     : 2,
						data            : []
					}
				]
			}
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.getWeightHistory();
		}
	}

	componentDidMount() {
		this.getWeightHistory();
	}

	getWeightHistory = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/measurement/weight/history', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let chart = Object.assign({}, state.chart);
					chart.labels = [];
					chart.datasets[0].data = [];
					for (let i = 0; i < data.weight.length; i++) {
						chart.labels.unshift(
							`${new Date(data.weight[i].date).getDate()}/${new Date(
								data.weight[i].date
							).getMonth()}/${new Date(data.weight[i].date).getFullYear()}`
						);
						chart.datasets[0].data.unshift(data.weight[i].value);
					}
					return { chart };
				});
			});
	};

	addWeightHistory = () => {
		return this.state.weightHistory.map((weight) => {
			let date = new Date(weight.date);
			return (
				<tr key={weight._id}>
					<td>
						{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}-{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
					</td>
					<td>{weight.value}</td>
				</tr>
			);
		});
	};

	render() {
		return (
			<div className="card alignCentre">
				<Line
					data={this.state.chart}
					options={{
						title  : {
							display  : true,
							text     : 'Weight History',
							fontSize : 20
						},
						legend : {
							display  : false,
							position : 'right'
						}
					}}
				/>
			</div>
		);
	}
}
