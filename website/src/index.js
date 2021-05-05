import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import Toolbar from "./components/Navigation/Toolbar";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import NutrientTracker from "./components/Nutrient/NutrientTracker";
import MeasurementTracker from "./components/Measurement/MeasurementTracker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProfile from "./components/User/UserProfile";
import WorkoutTracker from "./components/Workouts/WorkoutTracker";
import Exercises from "./components/Workouts/Exercises";
import ExerciseAdder from "./components/Workouts/ExerciseAdder";
import Ingredients from "./components/Nutrient/Ingredients";
import Meals from "./components/Nutrient/Meals";
import Page from "./components/Page";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Toolbar />
      <Switch>
        <Route path="/register" exact>
          <Page notIn>
            <Register/>
          </Page>
        </Route>
        <Route path="/login" exact>
          <Page notIn>
            <Login/>
          </Page>
        </Route>
        <Route path="/" exact>
          <Page>
            <NutrientTracker/>
          </Page>
        </Route>
        <Route path="/nutrientTracker" exact>
          <Page>
            <NutrientTracker/>
          </Page>
        </Route>
        <Route path="/nutrientTracker/ingredients" exact>
          <Page>
            <Ingredients/>
          </Page>
        </Route>
        <Route path="/nutrientTracker/meals" exact>
          <Page>
            <Meals/>
          </Page>
        </Route>
        <Route path="/workoutTracker" exact>
          <Page>
            <WorkoutTracker/>
          </Page>
        </Route>
        <Route path="/workoutTracker/exercises" exact>
          <Page>
            <Exercises/>
          </Page>
        </Route>
        <Route path="/workoutTracker/exercises/new" exact>
          <Page>
            <ExerciseAdder/>
          </Page>
        </Route>
        <Route path="/measurementTracker" exact>
          <Page>
            <MeasurementTracker/>
          </Page>
        </Route>
        <Route path="/userProfile" exact>
          <Page>
            <UserProfile/>
          </Page>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
