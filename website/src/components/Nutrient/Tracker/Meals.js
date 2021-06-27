import React from 'react'
import MealDetails from '../MealDetails'
import {
  getMeals,
  addPresetMeal,
  addIngredient,
  removeIngredient,
  modifyIngredient,
  removeMeal,
} from '../../../stateManagement/reducers/meals'
import { connect } from 'react-redux'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import { EditingState, RowDetailState } from '@devexpress/dx-react-grid'
import { getIngredients } from '../../../stateManagement/reducers/ingredients'
import { Carbohydrate, Ethanol, Fat, Protein } from '../../../style/inputs'
import {
  CalorieTypeProvider,
  WeightTypeProvider,
  CellComponent,
} from '../../gridUtil'

class Meals extends React.Component {
  constructor() {
    super()
    this.state = { errors: [] }
  }

  componentDidMount() {
    this.props.getMeals()
    this.props.getIngredients()
  }

  render() {
    const columns = [
      {
        name: 'calories',
        title: 'Calories',
        getCellValue: (row) => {
          if (!row.ingredients) return 0
          const ingredientIds = row.ingredients.map(
            (ingredient) => ingredient.id,
          )
          return this.props.ingredients
            .filter((ingredient) => ingredientIds.includes(ingredient._id))
            .reduce((tot, current) => {
              const weight =
                row.ingredients.find(
                  (ingredient) => ingredient.id === current._id,
                ).weight / 100
              return (
                //FIXME
                tot +
                current.macronutrients.fat * 9 * weight +
                current.macronutrients.carbohydrate * 4 * weight +
                current.macronutrients.protein * 4 * weight +
                current.macronutrients.ethanol * 7 * weight
              )
            }, 0)
        },
      },
      {
        name: 'fat',
        title: 'Fat',
        getCellValue: (row) => {
          if (!row.ingredients) return 0
          const ingredientIds = row.ingredients.map(
            (ingredient) => ingredient.id,
          )
          return this.props.ingredients
            .filter((ingredient) => ingredientIds.includes(ingredient._id))
            .reduce(
              (tot, current) =>
                tot +
                (current.macronutrients.fat *
                  row.ingredients.find(
                    (ingredient) => ingredient.id === current._id,
                  ).weight) /
                  100,
              0,
            )
        },
      },
      {
        name: 'carbohydrate',
        title: 'Carbs',
        getCellValue: (row) => {
          if (!row.ingredients) return 0
          const ingredientIds = row.ingredients.map(
            (ingredient) => ingredient.id,
          )
          return this.props.ingredients
            .filter((ingredient) => ingredientIds.includes(ingredient._id))
            .reduce(
              (tot, current) =>
                tot +
                (current.macronutrients.carbohydrate *
                  row.ingredients.find(
                    (ingredient) => ingredient.id === current._id,
                  ).weight) /
                  100,
              0,
            )
        },
      },
      {
        name: 'protein',
        title: 'Protein',
        getCellValue: (row) => {
          if (!row.ingredients) return 0
          const ingredientIds = row.ingredients.map(
            (ingredient) => ingredient.id,
          )
          return this.props.ingredients
            .filter((ingredient) => ingredientIds.includes(ingredient._id))
            .reduce(
              (tot, current) =>
                tot +
                (current.macronutrients.protein *
                  row.ingredients.find(
                    (ingredient) => ingredient.id === current._id,
                  ).weight) /
                  100,
              0,
            )
        },
      },
      {
        name: 'ethanol',
        title: 'Ethanol',
        getCellValue: (row) => {
          if (!row.ingredients) return 0
          const ingredientIds = row.ingredients.map(
            (ingredient) => ingredient.id,
          )
          return this.props.ingredients
            .filter((ingredient) => ingredientIds.includes(ingredient._id))
            .reduce(
              (tot, current) =>
                tot +
                (current.macronutrients.ethanol *
                  row.ingredients.find(
                    (ingredient) => ingredient.id === current._id,
                  ).weight) /
                  100,
              0,
            )
        },
      },
    ]
    return (
      <div>
        <Grid
          rows={this.props.meals}
          columns={columns}
          getRowId={(row) => row._id}
        >
          <EditingState
            onCommitChanges={({ deleted }) => {
              if (deleted) deleted.forEach((_id) => this.props.removeMeal(_id))
            }}
          />
          <CalorieTypeProvider for={['calories']} />
          <WeightTypeProvider for={['fat']} Component={Fat} />
          <WeightTypeProvider for={['carbohydrate']} Component={Carbohydrate} />
          <WeightTypeProvider for={['protein']} Component={Protein} />
          <WeightTypeProvider for={['ethanol']} Component={Ethanol} />

          <RowDetailState />

          <Table cellComponent={CellComponent} />
          <TableHeaderRow />
          <TableRowDetail
            contentComponent={({ row }) => (
              <MealDetails
                details={row}
                addIngredient={this.props.addIngredient}
                removeIngredient={this.props.removeIngredient}
                modifyIngredient={this.props.modifyIngredient}
              />
            )}
          />
          <TableEditColumn showDeleteCommand />
        </Grid>
      </div>
    )
  }
}

export default connect(({ meals, ingredients }) => ({ meals, ingredients }), {
  getMeals,
  addPresetMeal,
  removeMeal,
  addIngredient,
  removeIngredient,
  modifyIngredient,
  getIngredients,
})(Meals)
