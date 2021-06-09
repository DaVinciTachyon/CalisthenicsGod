import React from 'react';
import MealRow from './MealRow';
import MealAdder from './MealAdder';
import { setPresetMeals } from '../../../stateManagement/reducers/presetMeals';
import { connect } from 'react-redux';

class Meals extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (this.props.presetMeals.length === 0) this.props.setPresetMeals();
  }

  render() {
    return (
      <div>
        <MealRow isTitle />
        <MealAdder />
        {this.props.presetMeals.map((meal) => (
          <MealRow key={meal._id} meal={meal} />
        ))}
      </div>
    );
  }
}

export default connect(({ presetMeals }) => ({ presetMeals }), {
  setPresetMeals,
})(Meals);
