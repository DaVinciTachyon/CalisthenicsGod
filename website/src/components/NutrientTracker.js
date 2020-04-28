import React from 'react';
import './Main.css';
import PieChart from 'react-minimal-pie-chart';
import Modal from 'react-modal';

export default class NutrientTracker extends React.Component {
	constructor() {
		super();
		this.state = {
			fat: 1,
			carb: 1,
			prot: 1,
			eth: 1,
			fatCals: 9,
			carbCals: 4,
			protCals: 4,
			ethCals: 7,
			weight: 76,
			mode: 'deficit',
			showFullCals: false,
			fatDark: '#ffd433',
			fatLight: '#ffe582',
			carbDark: '#ff3f3f',
			carbLight: '#ff9999',
			protDark: '#35ff38',
			protLight: '#99f1ff',
			ethDark: '#3fafff',
			ethLight: '#82ff84'
		};
	}

	com;

	getWeight = () => {
		return this.state.weight;
	};

	getDailyCals = () => {
		if (this.state.mode === 'deficit') return this.getDeficitCals();
		else if (this.state.mode === 'bulk') return this.getBulkCals();
		else return this.getMaintenanceCals();
	};

	getGoalFatCals = () => {
		return Math.round(this.getDailyCals() * 0.3);
	};

	getGoalProtCals = () => {
		return Math.round(this.state.protCals * this.getWeight() * 1.9);
	};

	getGoalCarbCals = () => {
		return Math.round(this.getDailyCals() - this.getGoalFatCals() - this.getGoalProtCals());
	};

	getGoalEthCals = () => {
		return 0;
	};

	getMaintenanceCals = () => {
		return Math.round(2.20462 * this.getWeight() * 15);
	};

	getDeficitCals = () => {
		return Math.round(2.20462 * this.getWeight() * 11);
	};

	getBulkCals = () => {
		return Math.round(this.getMaintenanceCals() + 200);
	};

	getGoalFatGrams = () => {
		return Math.round(this.getGoalFatCals() / this.state.fatCals * 10) / 10;
	};

	getGoalCarbGrams = () => {
		return Math.round(this.getGoalCarbCals() / this.state.carbCals * 10) / 10;
	};

	getGoalProtGrams = () => {
		return Math.round(this.getGoalProtCals() / this.state.protCals * 10) / 10;
	};

	getGoalEthGrams = () => {
		return Math.round(this.getGoalEthCals() / this.state.ethCals * 10) / 10;
	};

	getFatGrams = () => {
		return this.state.fat;
	};

	getCarbGrams = () => {
		return this.state.carb;
	};

	getProtGrams = () => {
		return this.state.prot;
	};

	getEthGrams = () => {
		return this.state.eth;
	};

	getFatCals = () => {
		return this.getFatGrams() * this.state.fatCals;
	};

	getCarbCals = () => {
		return this.getCarbGrams() * this.state.carbCals;
	};

	getProtCals = () => {
		return this.getProtGrams() * this.state.protCals;
	};

	getEthCals = () => {
		return this.getEthGrams() * this.state.ethCals;
	};

	getTotCals = () => {
		return this.getFatCals() + this.getCarbCals() + this.getProtCals() + this.getEthCals();
	};

	getCalsLeft = () => {
		return this.getDailyCals() - this.getFatCals() - this.getCarbCals() - this.getProtCals() - this.getEthCals();
	};

	async componentDidMount() {
		if (!localStorage.getItem('authToken')) window.location = '/login';
	}

	showFullCals = () => {
		this.setState({ showFullCals: !this.state.showFullCals });
	};

	render() {
		return (
			<div style={{ padding: '100px' }}>
				<div className="card" onClick={this.showFullCals}>
					<div className="alignCentre">
						<table className="centreMe">
							<tbody>
								<tr>
									<th>Macro</th>
									<th>Grams Left</th>
									<th>Calories Left</th>
								</tr>
								<tr style={{ background: this.state.fatLight }}>
									<td>Fat</td>
									<td>{this.getGoalFatGrams() - this.getFatGrams()} g</td>
									<td>{this.getGoalFatCals() - this.getFatCals()} cals</td>
								</tr>
								<tr style={{ background: this.state.carbLight }}>
									<td>Carbohydrates</td>
									<td>{this.getGoalCarbGrams() - this.getCarbGrams()} g</td>
									<td>{this.getGoalCarbCals() - this.getCarbCals()} cals</td>
								</tr>
								<tr style={{ background: this.state.protLight }}>
									<td>Protein</td>
									<td>{this.getGoalProtGrams() - this.getProtGrams()} g</td>
									<td>{this.getGoalProtCals() - this.getProtCals()} cals</td>
								</tr>
								<tr style={{ background: this.state.ethLight }}>
									<td>Ethanol</td>
									<td>{this.getGoalEthGrams() - this.getEthGrams()} g</td>
									<td>{this.getGoalEthCals() - this.getEthCals()} cals</td>
								</tr>
							</tbody>
						</table>
						<div style={{ fontSize: '20px' }}>Cals Left: {this.getCalsLeft()} cals</div>
					</div>
				</div>
				<Modal
					isOpen={this.state.showFullCals}
					onRequestClose={this.showFullCals}
					contentLabel="Full Calorie View"
				>
					<div onClick={this.showFullCals} className="alignCentre">
						<div>
							<table className="centreMe">
								<tbody>
									<tr>
										<th>Macro</th>
										<th>Current Grams</th>
										<th>Goal Grams</th>
										<th>Grams Left</th>
									</tr>
									<tr style={{ background: this.state.fatLight }}>
										<td>Fat</td>
										<td>{this.getFatGrams()} g</td>
										<td>{this.getGoalFatGrams()} g</td>
										<td>{this.getGoalFatGrams() - this.getFatGrams()} g</td>
									</tr>
									<tr style={{ background: this.state.carbLight }}>
										<td>Carbohydrates</td>
										<td>{this.getCarbGrams()} g</td>
										<td>{this.getGoalCarbGrams()} g</td>
										<td>{this.getGoalCarbGrams() - this.getCarbGrams()} g</td>
									</tr>
									<tr style={{ background: this.state.protLight }}>
										<td>Protein</td>
										<td>{this.getProtGrams()} g</td>
										<td>{this.getGoalProtGrams()} g</td>
										<td>{this.getGoalProtGrams() - this.getProtGrams()} g</td>
									</tr>
									<tr style={{ background: this.state.ethLight }}>
										<td>Ethanol</td>
										<td>{this.getEthGrams()} g</td>
										<td>{this.getGoalEthGrams()} g</td>
										<td>{this.getGoalEthGrams() - this.getEthGrams()} g</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div>
							<table className="centreMe">
								<tbody>
									<tr>
										<th>Macro</th>
										<th>Current Calories</th>
										<th>Goal Calories</th>
										<th>Calories Left</th>
									</tr>
									<tr style={{ background: this.state.fatLight }}>
										<td>Fat</td>
										<td>{this.getFatCals()} cals</td>
										<td>{this.getGoalFatCals()} cals</td>
										<td>{this.getGoalFatCals() - this.getFatCals()} cals</td>
									</tr>
									<tr style={{ background: this.state.carbLight }}>
										<td>Carbohydrates</td>
										<td>{this.getCarbCals()} cals</td>
										<td>{this.getGoalCarbCals()} cals</td>
										<td>{this.getGoalCarbCals() - this.getCarbCals()} cals</td>
									</tr>
									<tr style={{ background: this.state.protLight }}>
										<td>Protein</td>
										<td>{this.getProtCals()} cals</td>
										<td>{this.getGoalProtCals()} cals</td>
										<td>{this.getGoalProtCals() - this.getProtCals()} cals</td>
									</tr>
									<tr style={{ background: this.state.ethLight }}>
										<td>Ethanol</td>
										<td>{this.getEthCals()} cals</td>
										<td>{this.getGoalEthCals()} cals</td>
										<td>{this.getGoalEthCals() - this.getEthCals()} cals</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div style={{ fontSize: '20px' }}>Daily Cals: {this.getDailyCals()} cals</div>
						<br />
						<div style={{ fontSize: '20px' }}>Cals Left: {this.getCalsLeft()} cals</div>
						<PieChart
							data={[
								{ title: 'Fat', value: this.getFatCals(), color: this.state.fatDark },
								{ title: 'Carbs', value: this.getCarbCals(), color: this.state.carbDark },
								{ title: 'Protein', value: this.getProtCals(), color: this.state.protDark },
								{ title: 'Ethanol', value: this.getEthCals(), color: this.state.ethDark }
							]}
							cx={50}
							cy={50}
							label
							labelPosition={50}
							labelStyle={{
								fill: '#121212',
								fontFamily: 'sans-serif',
								fontSize: '5px'
							}}
							style={{
								height: '250px',
								display: 'inline-block'
							}}
						/>
						<PieChart
							data={[
								{ title: 'Fat', value: this.getGoalFatCals(), color: this.state.fatDark },
								{ title: 'Carbs', value: this.getGoalCarbCals(), color: this.state.carbDark },
								{ title: 'Protein', value: this.getGoalProtCals(), color: this.state.protDark },
								{ title: 'Ethanol', value: this.getGoalEthCals(), color: this.state.ethDark }
							]}
							cx={50}
							cy={50}
							label
							labelPosition={50}
							labelStyle={{
								fill: '#121212',
								fontFamily: 'sans-serif',
								fontSize: '5px'
							}}
							style={{
								height: '250px',
								display: 'inline-block'
							}}
						/>
					</div>
				</Modal>
				<div className="card">Input here/connect to backend</div>
			</div>
		);
	}
}
