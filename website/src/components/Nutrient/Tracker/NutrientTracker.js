import React from 'react'
import NutrientSummary from './NutrientSummary'
import MealSelect from '../MealSelect'
import { Paper } from '@material-ui/core'
import MealIngredientAdder from './MealIngredientAdder'
import ConsumedMeal from './ConsumedMeal'
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
            onSubmit={async (id) => {
              if (id === '') this.setState({ isAddingMeal: true })
              else this.props.addPresetMeal(id)
            }}
          />
        )}
        {this.state.isAddingMeal && (
          <MealIngredientAdder
            onSubmit={() => this.setState({ isAddingMeal: false })}
            onCancel={() => this.setState({ isAddingMeal: false })}
          />
        )}
        {this.props.meals.map((meal) => (
          <ConsumedMeal
            key={meal._id}
            id={meal._id}
            ingredients={meal.ingredients}
          />
        ))}
      </div>
    )
  }
}

export default connect(({ meals }) => ({ meals }), {
  getMeals,
  addPresetMeal,
})(NutrientTracker)
