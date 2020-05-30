import React from "react";
import Exercises from "./Exercises";

export default class WorkoutTracker extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <Exercises />
      </div>
    );
  }
}
