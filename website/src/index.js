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
import WorkoutTracker from './components/Workouts/WorkoutTracker';
import WorkoutAdder from './components/Workouts/WorkoutAdder';
import Exercises from './components/Workouts/Exercises';
import ExerciseAdder from './components/Workouts/ExerciseAdder';
import Ingredients from './components/Nutrient/Ingredients/Ingredients';
import Meals from './components/Nutrient/Meals';
import Stages from './components/Workouts/Stages';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NonAuthenticatedRoute from './components/NonAuthenticatedRoute';

ReactDOM.render(
  <React.StrictMode>
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
          path="/workoutTracker/exercises/new"
          exact
          component={ExerciseAdder}
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
        <AuthenticatedRoute path="/userProfile" exact component={UserProfile} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
