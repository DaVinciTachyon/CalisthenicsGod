import React from 'react'
import MealRow from './MealRow'
import { Title } from '../../../style/table'
import {
  getPresetMeals,
  modifyPresetMeal,
  deletePresetMeal,
  addPresetMeal,
} from '../../../stateManagement/reducers/presetMeals'
import { connect } from 'react-redux'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditColumn,
  TableEditRow,
  PagingPanel,
  Toolbar,
  SearchPanel,
  TableFixedColumns,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  EditingState,
  DataTypeProvider,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  RowDetailState,
} from '@devexpress/dx-react-grid'
import { getIngredients } from '../../../stateManagement/reducers/ingredients'
import {
  Calories,
  Carbohydrate,
  Ethanol,
  Fat,
  Protein,
} from '../../../style/inputs'

class Meals extends React.Component {
  constructor() {
    super()
    this.state = { pageSizes: [10, 20], errors: [] }
  }

  componentDidMount() {
    this.props.getPresetMeals()
    this.props.getIngredients()
  }

  CalorieTypeProvider = (props) => (
    <DataTypeProvider
      formatterComponent={({ value }) => <span>{value} kcal</span>}
      editorComponent={(props) => <Calories {...props} />}
      {...props}
    />
  )

  WeightTypeProvider = ({ Component, ...rest }) => (
    <DataTypeProvider
      formatterComponent={({ value }) => <span>{value} g</span>}
      editorComponent={({ onValueChange, ...props }) => (
        <Component
          onChange={(evt) => onValueChange(evt.target.value)}
          {...props}
        />
      )}
      {...rest}
    />
  )

  EditCell = ({ errors, ...props }) => {
    const { children } = props
    return (
      <TableEditColumn.Cell {...props}>
        {React.Children.map(children, (child) =>
          child?.props.id === 'commit'
            ? React.cloneElement(child, {
                disabled: errors[props.tableRow.rowId],
              })
            : child,
        )}
      </TableEditColumn.Cell>
    )
  }

  editCellComponent = (props) => {
    const { EditCell } = this
    return <EditCell {...props} errors={this.state.errors} />
  }

  validate = (rows, columns) =>
    Object.entries(rows).reduce(
      (acc, [rowId, row]) => ({
        ...acc,
        [rowId]: columns.some(
          (column) => column.required && row[column.name] === '',
        ),
      }),
      {},
    )

  render() {
    const { CalorieTypeProvider, WeightTypeProvider, editCellComponent } = this
    const { pageSizes } = this.state
    const columns = [
      { name: 'name', title: 'Name', required: true },
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
        <Title>Meals</Title>
        {/* {this.props.presetMeals.map((meal) => (
          <MealRow key={meal._id} meal={meal} />
        ))} */}
        <Grid
          rows={this.props.presetMeals}
          columns={columns}
          getRowId={(row) => row._id}
        >
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <IntegratedSorting />

          <SearchState />
          <IntegratedFiltering />

          <PagingState defaultCurrentPage={0} pageSize={pageSizes[0]} />
          <IntegratedPaging />

          <EditingState
            onRowChangesChange={(edited) =>
              this.setState({ errors: this.validate(edited, columns) })
            }
            columnExtensions={[
              {
                columnName: 'name',
                createRowChange: (row, value) => ({ ...row, name: value }),
              },
              { columnName: 'calories', editingEnabled: false },
              { columnName: 'fat', editingEnabled: false },
              { columnName: 'carbohydrate', editingEnabled: false },
              { columnName: 'protein', editingEnabled: false },
              { columnName: 'ethanol', editingEnabled: false },
            ]}
            onCommitChanges={({ added, changed, deleted }) => {
              if (added)
                added.forEach(({ name }) =>
                  this.props.addPresetMeal({
                    name,
                    ingredients: [],
                  }),
                )
              if (changed) {
                Object.entries(changed).forEach((entry) => {
                  const { name } = this.props.presetMeals.find(
                    (meal) => meal._id === entry[0],
                  )
                  this.props.modifyPresetMeal({
                    _id: entry[0],
                    name: entry[1].name || name,
                  })
                })
              }
              if (deleted)
                deleted.forEach((_id) => this.props.deletePresetMeal(_id))
            }}
          />
          <CalorieTypeProvider for={['calories']} />
          <WeightTypeProvider for={['fat']} Component={Fat} />
          <WeightTypeProvider for={['carbohydrate']} Component={Carbohydrate} />
          <WeightTypeProvider for={['protein']} Component={Protein} />
          <WeightTypeProvider for={['ethanol']} Component={Ethanol} />

          <RowDetailState />

          <Table />
          <TableHeaderRow showSortingControls />
          <TableRowDetail
            contentComponent={({ row }) => <div>Details for {row.name}</div>}
          />
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            cellComponent={editCellComponent}
          />

          <TableFixedColumns leftColumns={['name']} />

          <PagingPanel pageSizes={pageSizes} />

          <Toolbar />
          <SearchPanel />
        </Grid>
      </div>
    )
  }
}

export default connect(
  ({ presetMeals, ingredients }) => ({ presetMeals, ingredients }),
  {
    getPresetMeals,
    getIngredients,
    modifyPresetMeal,
    deletePresetMeal,
    addPresetMeal,
  },
)(Meals)
