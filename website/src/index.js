import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Toolbar from './components/Navigation/Toolbar';
import Register from './components/Authentication/Register';
import Login from './components/Authentication/Login';
import NutrientTracker from './components/Nutrient/Tracker/NutrientTracker';
import MeasurementTracker from './components/Measurement/MeasurementTracker';
import MeasurementAdder from './components/Measurement/MeasurementAdder';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import UserProfile from './components/User/UserProfile';
import WorkoutTracker from './components/Workouts/Tracker/WorkoutTracker';
import WorkoutAdder from './components/Workouts/Tracker/WorkoutAdder';
import Exercises from './components/Workouts/Exercises/Exercises';
import Ingredients from './components/Nutrient/Ingredients/Ingredients';
import Meals from './components/Nutrient/Meals/Meals';
import Stages from './components/Workouts/Stages/Stages';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './reducers/store';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authentication'] = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')).authToken
  : null;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Toolbar />
        <Switch>
          <NonAuthenticatedRoute path="/register" exact component={Register} />
          <NonAuthenticatedRoute path="/login" exact component={Login} />
          <AuthenticatedRoute path="/" exact component={NutrientTracker} />
          <AuthenticatedRoute
            path="/nutrientTracker"
            exact
            component={NutrientTracker}
          />
          <AuthenticatedRoute
            path="/nutrientTracker/ingredients"
            exact
            component={Ingredients}
          />
          <AuthenticatedRoute
            path="/nutrientTracker/meals"
            exact
            component={Meals}
          />
          <AuthenticatedRoute
            path="/workoutTracker"
            exact
            component={WorkoutTracker}
          />
          <AuthenticatedRoute
            path="/workoutTracker/new"
            exact
            component={WorkoutAdder}
          />
          <AuthenticatedRoute
            path="/workoutTracker/exercises"
            exact
            component={Exercises}
          />
          <AuthenticatedRoute
            path="/workoutTracker/stages"
            exact
            component={Stages}
          />
          <AuthenticatedRoute
            path="/measurementTracker"
            exact
            component={MeasurementTracker}
          />
          <AuthenticatedRoute
            path="/measurementTracker/new"
            exact
            component={MeasurementAdder}
          />
          <AuthenticatedRoute
            path="/userProfile"
            exact
            component={UserProfile}
          />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
