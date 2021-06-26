import React from 'react'
import NutrientSummary from './NutrientSummary'
import MealSelect from '../MealSelect'
import { Paper } from '@material-ui/core'
import MealIngredientAdder from './MealIngredientAdder'
import Meals from './Meals'
import { connect } from 'react-redux'
import {
  getMeals,
  addPresetMeal,
} from '../../../stateManagement/reducers/meals'

class NutrientTracker extends React.Component {
  constructor() {
    super()
    this.state = {
      isAddingMeal: false,
    }
  }

  componentDidMount() {
    this.props.getMeals()
  }

  render() {
    return (
      <div>
        <Paper variant="outlined">
          <NutrientSummary meals={this.props.meals} />
        </Paper>
        {!this.state.isAddingMeal && (
          <MealSelect
            onSubmit={(id) => {
              if (!id) this.setState({ isAddingMeal: true })
              else this.props.addPresetMeal(id)
            }}
            placeholder="New Meal"
          />
        )}
        {this.state.isAddingMeal && (
          <MealIngredientAdder
            onSubmit={() => this.setState({ isAddingMeal: false })}
            onCancel={() => this.setState({ isAddingMeal: false })}
          />
        )}
        <Meals />
      </div>
    )
  }
}

export default connect(({ meals }) => ({ meals }), {
  getMeals,
  addPresetMeal,
})(NutrientTracker)
