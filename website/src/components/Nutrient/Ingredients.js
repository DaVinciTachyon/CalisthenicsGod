import React from "react";
import IngredientList from "./IngredientList";

export default class Ingredients extends React.Component {
  constructor() {
    super();
    this.state = {
      colours: {
        fatDark: "#ffd433",
        fatLight: "#ffe582",
        carbDark: "#ff3f3f",
        carbLight: "#ff9999",
        protDark: "#3fafff",
        protLight: "#99f1ff",
        ethDark: "#35ff38",
        ethLight: "#82ff84",
      },
      update: false,
      newIngredient: false,
    };
  }

  update = () => {
    this.setState({ update: !this.state.update });
  };

  flipNewIngredient = () => {
    this.setState({ newIngredient: !this.state.newIngredient });
  };

  changeFocus = () => {
    this.setState({ focus: !this.state.focus });
  };

  render() {
    return (
      <div>
        <IngredientList
          colours={this.state.colours}
          update={this.state.update}
          updateIngredients={this.update}
          changeFocus={this.changeFocus}
          focus={this.state.focus}
        />
        <IngredientList
          colours={this.state.colours}
          update={this.state.update}
          updateIngredients={this.update}
          changeFocus={this.changeFocus}
          focus={this.state.focus}
          isUnavailable={true}
        />
      </div>
    );
  }
}
