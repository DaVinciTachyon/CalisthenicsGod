import React from 'react';
import '../Main.css';
import PieChart from 'react-minimal-pie-chart';
import Modal from 'react-modal';

export default class NutrientSummary extends React.Component {
	constructor() {
		super();
		this.state = {
			fat: 0,
			carb: 0,
			prot: 0,
			eth: 0,
			dailyCals: 0,
			fatCals: 9,
			carbCals: 4,
			protCals: 4,
			ethCals: 7,
			goalFat: 0,
			goalCarb: 0,
			goalProt: 0,
			goalEth: 0,
			showFullCals: false
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.update !== this.props.update) {
			this.getUserInfo();
		}
	}

	componentDidMount() {
		this.getUserInfo();
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/nutrition/macronutrientDensities', requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					fatCals: data.fat,
					carbCals: data.carbohydrate,
					protCals: data.protein,
					ethCals: data.ethanol
				})
			);
	}

	getUserInfo = () => {
		const requestOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('authToken') }
		};
		fetch('http://localhost:8080/nutrition/today/userInfo', requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					dailyCals: data.totalCalories,
					fat: data.currentFat,
					carb: data.currentCarbohydrate,
					prot: data.currentProtein,
					eth: data.currentEthanol,
					goalFat: data.goalFat,
					goalCarb: data.goalCarbohydrate,
					goalProt: data.goalProtein,
					goalEth: data.goalEthanol
				})
			);
	};

	getDailyCals = () => this.state.dailyCals;

	getGoalFatCals = () => Math.round(this.getGoalFatGrams() * this.state.fatCals);
	getGoalProtCals = () => Math.round(this.getGoalProtGrams() * this.state.protCals);
	getGoalCarbCals = () => Math.round(this.getGoalCarbGrams() * this.state.carbCals);
	getGoalEthCals = () => Math.round(this.getGoalEthGrams() * this.state.ethCals);

	getGoalFatGrams = () => this.state.goalFat;
	getGoalCarbGrams = () => this.state.goalCarb;
	getGoalProtGrams = () => this.state.goalProt;
	getGoalEthGrams = () => this.state.goalEth;

	getFatGrams = () => this.state.fat;
	getCarbGrams = () => this.state.carb;
	getProtGrams = () => this.state.prot;
	getEthGrams = () => this.state.eth;

	getFatGramsLeft = () => Math.round((this.getGoalFatGrams() - this.getFatGrams()) * 10) / 10;
	getCarbGramsLeft = () => Math.round((this.getGoalCarbGrams() - this.getCarbGrams()) * 10) / 10;
	getProtGramsLeft = () => Math.round((this.getGoalProtGrams() - this.getProtGrams()) * 10) / 10;
	getEthGramsLeft = () => Math.round((this.getGoalEthGrams() - this.getEthGrams()) * 10) / 10;

	getFatCals = () => Math.round(this.getFatGrams() * this.state.fatCals);
	getCarbCals = () => Math.round(this.getCarbGrams() * this.state.carbCals);
	getProtCals = () => Math.round(this.getProtGrams() * this.state.protCals);
	getEthCals = () => Math.round(this.getEthGrams() * this.state.ethCals);

	getTotCals = () => this.getFatCals() + this.getCarbCals() + this.getProtCals() + this.getEthCals();

	getCalsLeft = () => this.getDailyCals() - this.getTotCals();

	showFullCals = () => {
		this.setState({ showFullCals: !this.state.showFullCals });
	};

	render() {
		return (
			<div>
				<div onClick={this.showFullCals}>
					<div className="alignCentre">
						<table className="centreMe">
							<tbody>
								<tr>
									<th>Macro</th>
									<th>Grams Left</th>
									<th>Calories Left</th>
								</tr>
								<tr style={{ background: this.props.fatLight }}>
									<td>Fat</td>
									<td>{this.getFatGramsLeft()} g</td>
									<td>{this.getGoalFatCals() - this.getFatCals()} cals</td>
								</tr>
								<tr style={{ background: this.props.carbLight }}>
									<td>Carbohydrates</td>
									<td>{this.getCarbGramsLeft()} g</td>
									<td>{this.getGoalCarbCals() - this.getCarbCals()} cals</td>
								</tr>
								<tr style={{ background: this.props.protLight }}>
									<td>Protein</td>
									<td>{this.getProtGramsLeft()} g</td>
									<td>{this.getGoalProtCals() - this.getProtCals()} cals</td>
								</tr>
								<tr style={{ background: this.props.ethLight }}>
									<td>Ethanol</td>
									<td>{this.getEthGramsLeft()} g</td>
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
									<tr style={{ background: this.props.fatLight }}>
										<td>Fat</td>
										<td>{this.getFatGrams()} g</td>
										<td>{this.getGoalFatGrams()} g</td>
										<td>{this.getFatGramsLeft()} g</td>
									</tr>
									<tr style={{ background: this.props.carbLight }}>
										<td>Carbohydrates</td>
										<td>{this.getCarbGrams()} g</td>
										<td>{this.getGoalCarbGrams()} g</td>
										<td>{this.getCarbGramsLeft()} g</td>
									</tr>
									<tr style={{ background: this.props.protLight }}>
										<td>Protein</td>
										<td>{this.getProtGrams()} g</td>
										<td>{this.getGoalProtGrams()} g</td>
										<td>{this.getProtGramsLeft()} g</td>
									</tr>
									<tr style={{ background: this.props.ethLight }}>
										<td>Ethanol</td>
										<td>{this.getEthGrams()} g</td>
										<td>{this.getGoalEthGrams()} g</td>
										<td>{this.getEthGramsLeft()} g</td>
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
									<tr style={{ background: this.props.fatLight }}>
										<td>Fat</td>
										<td>{this.getFatCals()} cals</td>
										<td>{this.getGoalFatCals()} cals</td>
										<td>{this.getGoalFatCals() - this.getFatCals()} cals</td>
									</tr>
									<tr style={{ background: this.props.carbLight }}>
										<td>Carbohydrates</td>
										<td>{this.getCarbCals()} cals</td>
										<td>{this.getGoalCarbCals()} cals</td>
										<td>{this.getGoalCarbCals() - this.getCarbCals()} cals</td>
									</tr>
									<tr style={{ background: this.props.protLight }}>
										<td>Protein</td>
										<td>{this.getProtCals()} cals</td>
										<td>{this.getGoalProtCals()} cals</td>
										<td>{this.getGoalProtCals() - this.getProtCals()} cals</td>
									</tr>
									<tr style={{ background: this.props.ethLight }}>
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
						{(this.getFatCals() > 0 ||
							this.getCarbCals() > 0 ||
							this.getProtCals() > 0 ||
							this.getEthCals() > 0) && (
							<PieChart
								animate
								animationDuration={700}
								data={[
									{
										title: 'Fat',
										value: this.getFatCals(),
										color: this.props.fatDark
									},
									{
										title: 'Carbs',
										value: this.getCarbCals() > 0 ? this.getCarbCals() : '',
										color: this.props.carbDark
									},
									{
										title: 'Protein',
										value: this.getProtCals() > 0 ? this.getProtCals() : '',
										color: this.props.protDark
									},
									{
										title: 'Ethanol',
										value: this.getEthCals() > 0 ? this.getEthCals() : '',
										color: this.props.ethDark
									}
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
						)}
						<PieChart
							animate
							animationDuration={700}
							data={[
								{
									title: 'Fat',
									value: this.getGoalFatCals() > 0 ? this.getGoalFatCals() : '',
									color: this.props.fatDark
								},
								{
									title: 'Carbs',
									value: this.getGoalCarbCals() > 0 ? this.getGoalCarbCals() : '',
									color: this.props.carbDark
								},
								{
									title: 'Protein',
									value: this.getGoalProtCals() > 0 ? this.getGoalProtCals() : '',
									color: this.props.protDark
								},
								{
									title: 'Ethanol',
									value: this.getGoalEthCals() > 0 ? this.getGoalEthCals : '',
									color: this.props.ethDark
								}
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
			</div>
		);
	}
}
