import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Toolbar from './components/Toolbar';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
