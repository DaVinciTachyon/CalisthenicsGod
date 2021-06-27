import React from 'react'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableEditRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  EditingState,
} from '@devexpress/dx-react-grid'
import { Carbohydrate, Ethanol, Fat, Protein } from '../../style/inputs'
import { connect } from 'react-redux'
import {
  CalorieTypeProvider,
  WeightTypeProvider,
  IngredientTypeProvider,
  CellComponent,
  validate,
  EditCell,
} from '../gridUtil'

class MealDetails extends React.Component {
  constructor() {
    super()
    this.state = { errors: [] }
  }

  editCellComponent = (props) => (
    <EditCell {...props} errors={this.state.errors} />
  )

  render() {
    const { editCellComponent } = this
    const columns = [
      { name: 'id', title: 'Name', required: true },
      {
        name: 'calories',
        title: 'Calories',
        getCellValue: (row) => {
          const ingredients = this.props.ingredients.find(
            (ingredient) => ingredient._id === row.id,
          )
          const weight = row.weight / 100 || 0
          const { fat, carbohydrate, protein, ethanol } = {
            fat: ingredients?.macronutrients.fat || 0,
            carbohydrate: ingredients?.macronutrients.carbohydrate || 0,
            protein: ingredients?.macronutrients.protein || 0,
            ethanol: ingredients?.macronutrients.ethanol || 0,
          }
          return (
            //FIXME
            (fat * 9 + carbohydrate * 4 + protein * 4 + ethanol * 7) * weight
          )
        },
      },
      { name: 'weight', title: 'Weight', required: true },
      {
        name: 'fat',
        title: 'Fat',
        getCellValue: (row) => {
          const ingredients = this.props.ingredients.find(
            (ingredient) => ingredient._id === row.id,
          )
          const weight = row.weight / 100 || 0
          const fat = ingredients?.macronutrients.fat || 0
          return fat * weight
        },
      },
      {
        name: 'carbohydrate',
        title: 'Carbs',
        getCellValue: (row) => {
          const ingredients = this.props.ingredients.find(
            (ingredient) => ingredient._id === row.id,
          )
          const weight = row.weight / 100 || 0
          const carbohydrate = ingredients?.macronutrients.carbohydrate || 0
          return carbohydrate * weight
        },
      },
      {
        name: 'protein',
        title: 'Protein',
        getCellValue: (row) => {
          const ingredients = this.props.ingredients.find(
            (ingredient) => ingredient._id === row.id,
          )
          const weight = row.weight / 100 || 0
          const protein = ingredients?.macronutrients.protein || 0
          return protein * weight
        },
      },
      {
        name: 'ethanol',
        title: 'Ethanol',
        getCellValue: (row) => {
          const ingredients = this.props.ingredients.find(
            (ingredient) => ingredient._id === row.id,
          )
          const weight = row.weight / 100 || 0
          const ethanol = ingredients?.macronutrients.ethanol || 0
          return ethanol * weight
        },
      },
    ]
    return (
      <Grid
        rows={this.props.details.ingredients}
        columns={columns}
        getRowId={(row) => row._id}
      >
        <SortingState
          defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
        />
        <IntegratedSorting />

        <EditingState
          onRowChangesChange={(edited) =>
            this.setState({ errors: validate(edited, columns) })
          }
          columnExtensions={[
            {
              columnName: 'id',
              createRowChange: (row, value) => ({ ...row, id: value }),
            },
            { columnName: 'calories', editingEnabled: false },
            {
              columnName: 'weight',
              createRowChange: (row, value) => ({ ...row, weight: value }),
            },
            { columnName: 'fat', editingEnabled: false },
            { columnName: 'carbohydrate', editingEnabled: false },
            { columnName: 'protein', editingEnabled: false },
            { columnName: 'ethanol', editingEnabled: false },
          ]}
          onCommitChanges={({ added, changed, deleted }) => {
            if (added)
              added.forEach(({ id, weight }) =>
                this.props.addIngredient({
                  _id: this.props.details._id,
                  ingredient: { id, weight },
                }),
              )
            if (changed)
              Object.entries(changed).forEach((entry) => {
                const { id, weight } = this.props.meals
                  .find((meal) => meal._id === this.props.details._id)
                  .ingredients.find((ingredient) => ingredient._id === entry[0])
                this.props.modifyIngredient({
                  _id: this.props.details._id,
                  ingredient: {
                    _id: entry[0],
                    id: entry[1].id || id,
                    weight: entry[1].weight || weight,
                  },
                })
              })
            if (deleted)
              deleted.forEach((_id) =>
                this.props.removeIngredient({
                  _id: this.props.details._id,
                  ingredient: { _id },
                }),
              )
          }}
        />
        <IngredientTypeProvider for={['id']} />
        <CalorieTypeProvider for={['calories']} />
        <WeightTypeProvider for={['weight']} />
        <WeightTypeProvider for={['fat']} Component={Fat} />
        <WeightTypeProvider for={['carbohydrate']} Component={Carbohydrate} />
        <WeightTypeProvider for={['protein']} Component={Protein} />
        <WeightTypeProvider for={['ethanol']} Component={Ethanol} />

        <Table cellComponent={CellComponent} />
        <TableHeaderRow showSortingControls />

        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand
          cellComponent={editCellComponent}
        />

        <TableFixedColumns leftColumns={['name']} />
      </Grid>
    )
  }
}

export default connect(({ ingredients }) => ({ ingredients }), {})(MealDetails)
