import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Toolbar from './components/Navigation/Toolbar';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import NutrientTracker from './components/Nutrient/NutrientTracker';
import Ingredients from './components/Nutrient/Ingredients';
import MeasurementTracker from './components/Measurement/MeasurementTracker';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProfile from './components/User/UserProfile';

function App() {
	return (
		<Router>
			<div>
				<Toolbar />
				<div className="main">
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/register" exact component={Register} />
						<Route path="/login" exact component={Login} />
						<Route path="/nutrientTracker" exact component={NutrientTracker} />
						<Route path="/measurementTracker" exact component={MeasurementTracker} />
						<Route path="/userProfile" exact component={UserProfile} />
						<Route path="/ingredients" exact component={Ingredients} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
