import React from 'react'
import { connect } from 'react-redux'
import { getIngredients } from '../../../stateManagement/reducers/ingredients'
import { getNutritionInfo } from '../../../stateManagement/reducers/user'
import { getMeasurementHistory } from '../../../stateManagement/reducers/measurements'
import { getMacroDensities } from '../util'
import { getWeight } from '../../util'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import {
  CalorieTypeProvider,
  WeightTypeProvider,
  CellComponent,
} from '../gridUtil'

class NutrientSummary extends React.Component {
  constructor() {
    super()
    this.state = {
      goal: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
      current: {
        fat: 0,
        carbohydrate: 0,
        protein: 0,
        ethanol: 0,
      },
    }
  }

  componentDidMount() {
    this.props.getIngredients()
    this.props.getNutritionInfo()
    this.props.getMeasurementHistory('weight')
    this.getMacros()
    this.setMacros()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.meals !== this.props.meals ||
      prevProps.ingredients !== this.props.ingredients
    )
      this.getMacros()
    if (
      prevProps.measurements !== this.props.measurements ||
      prevProps.user !== this.props.user
    )
      this.setMacros()
  }

  setMacros = async () => {
    let nutrition = {
      caloriesPerKg: 0,
      calorieOffset: 0,
      proteinGramsPerKg: 0,
      fatCalorieProportion: 0,
    }
    if (this.props.user.nutrition) nutrition = this.props.user.nutrition
    const weight = getWeight(this.props.measurements.weight)
    const macroDensities = await getMacroDensities()
    const calories = weight * nutrition.caloriesPerKg * nutrition.calorieOffset
    const protein = weight * nutrition.proteinGramsPerKg
    const fat = (nutrition.fatCalorieProportion * calories) / macroDensities.fat
    const carbohydrate =
      (calories - protein * macroDensities.protein - fat * macroDensities.fat) /
      macroDensities.carbohydrate
    this.setState({ goal: { protein, fat, carbohydrate, ethanol: 0 } })
  }

  getMacros = () => {
    let fat = 0
    let carbohydrate = 0
    let protein = 0
    let ethanol = 0
    this.props.meals.forEach((meal) =>
      meal.ingredients.forEach((ingredient) => {
        const { macronutrients } = this.props.ingredients.find(
          (ing) => ing._id === ingredient.id,
        ) || {
          macronutrients: { fat: 0, carbohydrate: 0, protein: 0, ethanol: 0 },
        }
        fat += (ingredient.weight * macronutrients.fat) / 100
        carbohydrate += (ingredient.weight * macronutrients.carbohydrate) / 100
        protein += (ingredient.weight * macronutrients.protein) / 100
        ethanol += (ingredient.weight * macronutrients.ethanol) / 100
      }),
    )
    this.setState({ current: { fat, carbohydrate, protein, ethanol } })
  }

  render() {
    return (
      <Grid
        rows={[
          {
            name: 'Goal',
            fat: this.state.goal.fat,
            carbohydrate: this.state.goal.carbohydrate,
            protein: this.state.goal.protein,
            ethanol: this.state.goal.ethanol,
          },
          {
            name: 'Current',
            fat: this.state.current.fat,
            carbohydrate: this.state.current.carbohydrate,
            protein: this.state.current.protein,
            ethanol: this.state.current.ethanol,
          },
          {
            name: 'Left',
            fat: this.state.goal.fat - this.state.current.fat,
            carbohydrate:
              this.state.goal.carbohydrate - this.state.current.carbohydrate,
            protein: this.state.goal.protein - this.state.current.protein,
            ethanol: this.state.goal.ethanol - this.state.current.ethanol,
          },
        ]}
        columns={[
          { name: 'name', title: ' ' },
          {
            name: 'calories',
            title: 'Calories',
            getCellValue: (
              row, //FIXME
            ) =>
              row.fat * 9 +
              row.carbohydrate * 4 +
              row.protein * 4 +
              row.ethanol * 7,
          },
          { name: 'fat', title: 'Fat' },
          { name: 'carbohydrate', title: 'Carbs' },
          { name: 'protein', title: 'Protein' },
          { name: 'ethanol', title: 'Ethanol' },
        ]}
      >
        <CalorieTypeProvider for={['calories']} />
        <WeightTypeProvider
          for={['fat', 'carbohydrate', 'protein', 'ethanol']}
        />

        <Table cellComponent={CellComponent} />
        <TableHeaderRow />
      </Grid>
    )
  }
}

export default connect(
  ({ ingredients, user, measurements }) => ({
    ingredients,
    user,
    measurements,
  }),
  {
    getIngredients,
    getNutritionInfo,
    getMeasurementHistory,
  },
)(NutrientSummary)
