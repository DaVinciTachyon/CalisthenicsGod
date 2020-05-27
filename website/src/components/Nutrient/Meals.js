import React from 'react';
import MealEditor from './MealEditor';

export default class Meals extends React.Component {
	constructor() {
		super();
		this.state = {
			update  : false,
			newMeal : false,
			meals   : [],
			name    : ''
		};
	}

	componentDidMount() {
		this.getMealNames();
	}

	update = () => {
		this.setState({ update: !this.state.update });
		this.props.update();
		this.getMealNames();
	};

	flipNewMeal = () => {
		this.setState({ newMeal: !this.state.newMeal });
	};

	getMealNames = () => {
		const requestOptions = {
			method  : 'GET',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			}
		};
		fetch('http://localhost:8080/nutrition/meals/preset/names/', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				this.setState((state) => {
					let meals = Object.assign({}, state.meals);
					meals = data.names;
					return { meals };
				});
			});
	};

	newMeal = (evt) => {
		evt.preventDefault();
		const requestOptions = {
			method  : 'POST',
			headers : {
				'Content-Type' : 'application/json',
				'auth-token'   : localStorage.getItem('authToken')
			},
			body    : JSON.stringify({
				name        : this.state.name,
				ingredients : []
			})
		};
		fetch('http://localhost:8080/nutrition/meals/preset/add/', requestOptions).then(() => {
			this.flipNewMeal();
			this.setState({ name: '' });
			this.getMealNames();
			this.props.update();
		});
	};

	nameChange = (evt) => {
		const input = evt.target.validity.valid ? evt.target.value : this.state.name;
		this.setState({ name: input });
	};

	render() {
		let meals = [];
		for (let i = 0; i < this.state.meals.length; i++) {
			meals.push(
				<MealEditor
					key={`meals${i}`}
					update={this.update}
					meal={this.state.meals[i]}
					colours={this.props.colours}
				/>
			);
		}
		return (
			<div>
				{!this.state.newMeal && <button onClick={this.flipNewMeal}>New Meal</button>}
				{this.state.newMeal && (
					<div>
						<form onSubmit={this.newMeal.bind(this)}>
							<input
								name="name"
								type="text"
								value={this.state.name}
								onChange={this.nameChange.bind(this)}
								className="input"
								required
							/>
							<input type="submit" value="Add" />
						</form>
						<button onClick={this.flipNewMeal}>Cancel</button>
					</div>
				)}

				{meals}
			</div>
		);
	}
}
