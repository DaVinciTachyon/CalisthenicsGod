import React from "react";
import "./Exercises.css";

export default class Exercises extends React.Component {
  constructor() {
    super();
    this.state = {
      exercises: [
        {
          _id: "1",
          name: "planche",
          type: "isometric",
          abbreviation: "PL",
        },
        {
          _id: "2",
          name: "pull up",
          type: "isotonic",
          abbreviation: "",
        },
        {
          _id: "3",
          name: "front lever",
          type: "eccentric",
          abbreviation: "FL",
        },
        {
          _id: "3",
          name: "handstand push up",
          type: "concentric",
          abbreviation: "HSPU",
        },
      ],
    };
  }

  render() {
    let exercises = [];
    for (const exercise of this.state.exercises)
      exercises.push(
        <tr key={exercise.id} className="exercise">
          <td className="name">{exercise.name}</td>
          <td className="abbreviation">{exercise.abbreviation}</td>
          <td className="type">{exercise.type}</td>
        </tr>
      );
    return (
      <div>
        <table>
          <tbody>
            <tr className="title exercise">
              <th className="name">Name</th>
              <th className="abbreviation">Abbreviation</th>
              <th className="type">Type</th>
            </tr>
            {exercises}
          </tbody>
        </table>
      </div>
    );
  }
}
