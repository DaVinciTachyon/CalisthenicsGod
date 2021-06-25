import React from 'react'
import { Title } from '../../../style/table'
import { connect } from 'react-redux'
import { getIngredients } from '../../../stateManagement/reducers/ingredients'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  EditingState,
} from '@devexpress/dx-react-grid'
import {
  changeAvailability,
  patchIngredient,
  addIngredient,
} from '../../../stateManagement/reducers/ingredients'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import { getCalories } from '../util'

class IngredientList extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getIngredients()
  }

  render() {
    const { isUnavailable, ingredients } = this.props
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <Grid
          rows={ingredients
            .filter((ingredient) =>
              isUnavailable ? !ingredient.isAvailable : ingredient.isAvailable,
            )
            .map(({ macronutrients, ...rest }) => {
              const { fat, carbohydrate, protein, ethanol } = macronutrients
              return { fat, carbohydrate, protein, ethanol, ...rest }
            })}
          columns={[
            { name: 'name', title: 'Name' },
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
            {
              name: 'weight',
              title: 'Weight',
              getCellValue: () => 100,
            },
            {
              name: 'fat',
              title: 'Fat',
            },
            {
              name: 'carbohydrate',
              title: 'Carbs',
            },
            {
              name: 'protein',
              title: 'Protein',
            },
            {
              name: 'ethanol',
              title: 'Ethanol',
            },
          ]}
          getRowId={(row) => row._id}
        >
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <IntegratedSorting />

          <PagingState defaultCurrentPage={0} pageSize={10} />
          <IntegratedPaging />

          <EditingState
            onCommitChanges={({ added, changed, deleted }) => {
              if (added)
                added.forEach(
                  ({ name, fat, carbohydrate, protein, ethanol }) => {
                    this.props.addIngredient({
                      name,
                      macronutrients: {
                        fat: fat || 0,
                        carbohydrate: carbohydrate || 0,
                        protein: protein || 0,
                        ethanol: ethanol || 0,
                      },
                    })
                  },
                )
              if (changed)
                Object.entries(changed).forEach((entry) => {
                  const { name, macronutrients } = entry[1]
                  this.props.patchIngredient({
                    _id: entry[0],
                    name,
                    macronutrients,
                  })
                })
              if (deleted)
                deleted.forEach((_id) =>
                  this.props.changeAvailability({
                    _id,
                    isAvailable: !isUnavailable,
                  }),
                )
            }}
            columnExtensions={[
              {
                columnName: 'name',
                createRowChange: (row, value) => ({ ...row, name: value }),
              },

              {
                name: 'fat',
                createRowChange: (row, value) => ({
                  ...row,
                  macronutrients: { ...row.macronutrients, fat: value },
                }),
              },
              {
                name: 'carbohydrate',
                createRowChange: (row, value) => ({
                  ...row,
                  macronutrients: {
                    ...row.macronutrients,
                    carbohydrate: value,
                  },
                }),
              },
              {
                name: 'protein',
                createRowChange: (row, value) => ({
                  ...row,
                  macronutrients: { ...row.macronutrients, protein: value },
                }),
              },
              {
                name: 'ethanol',
                createRowChange: (row, value) => ({
                  ...row,
                  macronutrients: { ...row.macronutrients, ethanol: value },
                }),
              },
            ]}
          />

          <Table
            cellComponent={({ style, ...props }) => {
              const macroCell = (name) => (
                <Table.Cell
                  style={{
                    backgroundColor: this.props.theme.palette[name].light,
                    ...style,
                  }}
                  {...props}
                />
              )
              const { column } = props
              if (column.name === 'fat') macroCell('fat')
              else if (column.name === 'carbohydrate') macroCell('carbohydrate')
              else if (column.name === 'protein') macroCell('protein')
              else if (column.name === 'ethanol') macroCell('ethanol')
              return <Table.Cell style={style} {...props} />
            }}
          />
          <TableHeaderRow showSortingControls />

          <TableEditRow />
          <TableEditColumn
            showAddCommand={!isUnavailable}
            showEditCommand
            showDeleteCommand
          />

          <PagingPanel />
        </Grid>
      </div>
    )
  }
}

export default compose(
  withStyles({}, { withTheme: true }),
  connect(({ ingredients }) => ({ ingredients }), {
    getIngredients,
    changeAvailability,
    patchIngredient,
    addIngredient,
  }),
)(IngredientList)
