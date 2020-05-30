import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Toolbar from "./components/Navigation/Toolbar";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import NutrientTracker from "./components/Nutrient/NutrientTracker";
import MeasurementTracker from "./components/Measurement/MeasurementTracker";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProfile from "./components/User/UserProfile";
import WorkoutTracker from "./components/Workouts/WorkoutTracker";
import Ingredients from "./components/Nutrient/Ingredients";
import Meals from "./components/Nutrient/Meals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Toolbar />
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={NutrientTracker} />
        <Route path="/nutrientTracker" exact component={NutrientTracker} />
        <Route
          path="/nutrientTracker/ingredients"
          exact
          component={Ingredients}
        />
        <Route path="/nutrientTracker/meals" exact component={Meals} />
        <Route path="/workoutTracker" exact component={WorkoutTracker} />
        <Route
          path="/measurementTracker"
          exact
          component={MeasurementTracker}
        />
        <Route path="/userProfile" exact component={UserProfile} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
