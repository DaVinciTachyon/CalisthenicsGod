import React from 'react';
import Modal from '../Modal';
import IngredientRow from './IngredientRow';

export default class NutrientSummary extends React.Component {
	constructor() {
		super();
		this.state = {
			macros    : {
				fat          : 0,
				carbohydrate : 0,
				protein      : 0,
				ethanol      : 0
			},
			showModal : false
		};
	}

	componentDidMount() {
		this.getUserGoals();
	}

	render() {
		return (
			<div>
				<div onClick={this.showModal}>
					<div className="alignCentre">
						<table className="ingredientTable">
							<tbody>
								<tr className="title">
									<th />
									<th>Calories</th>
									<th>Fat</th>
									<th>Carbohydrate</th>
									<th>Protein</th>
									<th>Ethanol</th>
									<th />
								</tr>
								<tr className="subtitle">
									<th />
									<th>kcal</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th />
								</tr>
								<IngredientRow
									key={'goal'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Goal',
										fat          : this.state.macros.fat,
										carbohydrate : this.state.macros.carbohydrate,
										protein      : this.state.macros.protein,
										ethanol      : this.state.macros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
								<IngredientRow
									key={'current'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Current',
										fat          : this.props.currentMacros.fat,
										carbohydrate : this.props.currentMacros.carbohydrate,
										protein      : this.props.currentMacros.protein,
										ethanol      : this.props.currentMacros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
								<IngredientRow
									key={'left'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Left',
										fat          :
											this.state.macros.fat - this.props.currentMacros.fat,
										carbohydrate :
											this.state.macros.carbohydrate -
											this.props.currentMacros.carbohydrate,
										protein      :
											this.state.macros.protein -
											this.props.currentMacros.protein,
										ethanol      :
											this.state.macros.ethanol -
											this.props.currentMacros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
							</tbody>
						</table>
					</div>
				</div>
				<Modal isOpen={this.state.showModal} toggle={this.showModal} onInternalClick={true}>
					<div className="alignCentre">
						<table className="ingredientTable">
							<tbody>
								<tr className="title">
									<th />
									<th>Calories</th>
									<th>Fat</th>
									<th>Carbohydrate</th>
									<th>Protein</th>
									<th>Ethanol</th>
									<th />
								</tr>
								<tr className="subtitle">
									<th />
									<th>kcal</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th>grams</th>
									<th />
								</tr>
								<IngredientRow
									key={'modal_goal'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Goal',
										fat          : this.state.macros.fat,
										carbohydrate : this.state.macros.carbohydrate,
										protein      : this.state.macros.protein,
										ethanol      : this.state.macros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
								<IngredientRow
									key={'modal_current'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Current',
										fat          : this.props.currentMacros.fat,
										carbohydrate : this.props.currentMacros.carbohydrate,
										protein      : this.props.currentMacros.protein,
										ethanol      : this.props.currentMacros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
								<IngredientRow
									key={'modal_left'}
									colours={this.props.colours}
									ingredient={{
										name         : 'Left',
										fat          :
											this.state.macros.fat - this.props.currentMacros.fat,
										carbohydrate :
											this.state.macros.carbohydrate -
											this.props.currentMacros.carbohydrate,
										protein      :
											this.state.macros.protein -
											this.props.currentMacros.protein,
										ethanol      :
											this.state.macros.ethanol -
											this.props.currentMacros.ethanol
									}}
									macroDensities={this.props.macroDensities}
									isSummary={true}
								/>
							</tbody>
						</table>
					</div>
				</Modal>
			</div>
		);
	}

	getUserGoals = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/nutrition/goals', requestOptions)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					macros : data
				})
			);
	};

	showModal = () => {
		this.setState({ showModal: !this.state.showModal });
	};
}
