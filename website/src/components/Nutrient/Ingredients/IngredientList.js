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
  SearchPanel,
  Toolbar,
  TableFixedColumns,
  // TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  EditingState,
  DataTypeProvider,
  SearchState,
  IntegratedFiltering,
  // RowDetailState,
} from '@devexpress/dx-react-grid'
import {
  changeAvailability,
  patchIngredient,
  addIngredient,
} from '../../../stateManagement/reducers/ingredients'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
// import { getCalories } from '../util'
import {
  Calories,
  Carbohydrate,
  Ethanol,
  Fat,
  Protein,
  Weight,
} from '../../../style/inputs'

class IngredientList extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: [
        { name: 'name', title: 'Name', required: true },
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
        { name: 'fat', title: 'Fat' },
        { name: 'carbohydrate', title: 'Carbs' },
        { name: 'protein', title: 'Protein' },
        { name: 'ethanol', title: 'Ethanol' },
      ],
      errors: [],
      editExtensions: [
        {
          columnName: 'name',
          createRowChange: (row, value) => ({ ...row, name: value }),
        },
        { columnName: 'calories', editingEnabled: false },
        { columnName: 'weight', editingEnabled: false },
        {
          name: 'fat',
          createRowChange: (row, value) => ({ ...row, fat: value }),
        },
        {
          name: 'carbohydrate',
          createRowChange: (row, value) => ({ ...row, carbohydrate: value }),
        },
        {
          name: 'protein',
          createRowChange: (row, value) => ({ ...row, protein: value }),
        },
        {
          name: 'ethanol',
          createRowChange: (row, value) => ({ ...row, ethanol: value }),
        },
      ],
      editColumnMessages: {},
      pageSizes: [5, 10],
    }
  }

  componentDidMount() {
    this.props.getIngredients()
    this.setState({
      editColumnMessages: {
        deleteCommand: this.props.isUnavailable ? 'Add' : 'Remove',
      },
    })
  }

  validate = (rows) =>
    Object.entries(rows).reduce(
      (acc, [rowId, row]) => ({
        ...acc,
        [rowId]: this.state.columns.some(
          (column) => column.required && row[column.name] === '',
        ),
      }),
      {},
    )

  commitChanges = ({ added, changed, deleted }) => {
    if (added)
      added.forEach(({ name, fat, carbohydrate, protein, ethanol }) =>
        this.props.addIngredient({
          name,
          macronutrients: {
            fat: fat || 0,
            carbohydrate: carbohydrate || 0,
            protein: protein || 0,
            ethanol: ethanol || 0,
          },
        }),
      )
    if (changed)
      Object.entries(changed).forEach((entry) => {
        const { name, macronutrients } = this.props.ingredients.find(
          (ingredient) => ingredient._id === entry[0],
        )
        this.props.patchIngredient({
          _id: entry[0],
          name: entry[1].name || name,
          macronutrients: {
            fat: entry[1].fat || macronutrients.fat,
            carbohydrate: entry[1].carbohydrate || macronutrients.carbohydrate,
            protein: entry[1].protein || macronutrients.protein,
            ethanol: entry[1].ethanol || macronutrients.ethanol,
          },
        })
      })
    if (deleted)
      deleted.forEach((_id) =>
        this.props.changeAvailability({
          _id,
          isAvailable: !this.props.isUnavailable,
        }),
      )
  }

  cellComponent = ({ style, ...props }) => {
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
    if (column.name === 'fat') return macroCell('fat')
    else if (column.name === 'carbohydrate') return macroCell('carbohydrate')
    else if (column.name === 'protein') return macroCell('protein')
    else if (column.name === 'ethanol') return macroCell('ethanol')
    return <Table.Cell style={style} {...props} />
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

  render() {
    const { isUnavailable, ingredients } = this.props
    const {
      CalorieTypeProvider,
      WeightTypeProvider,
      commitChanges,
      cellComponent,
      editCellComponent,
    } = this
    const {
      editExtensions,
      columns,
      editColumnMessages,
      pageSizes,
    } = this.state
    return (
      <div>
        <Title>
          {!isUnavailable && <>Available</>}
          {isUnavailable && <>Unavailable</>}
        </Title>
        <Grid
          rows={ingredients
            .filter(({ isAvailable }) =>
              isUnavailable ? !isAvailable : isAvailable,
            )
            .map(({ macronutrients, ...rest }) => {
              const { fat, carbohydrate, protein, ethanol } = macronutrients
              return { fat, carbohydrate, protein, ethanol, ...rest }
            })}
          columns={columns}
          getRowId={(row) => row._id}
        >
          <SearchState />
          <IntegratedFiltering />
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
            columnExtensions={[{ columnName: 'weight', sortingEnabled: false }]}
          />
          <IntegratedSorting />

          <PagingState defaultCurrentPage={0} defaultPageSize={pageSizes[0]} />
          <IntegratedPaging />

          <EditingState
            onRowChangesChange={(edited) =>
              this.setState({ errors: this.validate(edited) })
            }
            onCommitChanges={commitChanges}
            columnExtensions={editExtensions}
          />
          <CalorieTypeProvider for={['calories']} />
          <WeightTypeProvider for={['weight']} Component={Weight} />
          <WeightTypeProvider for={['fat']} Component={Fat} />
          <WeightTypeProvider for={['carbohydrate']} Component={Carbohydrate} />
          <WeightTypeProvider for={['protein']} Component={Protein} />
          <WeightTypeProvider for={['ethanol']} Component={Ethanol} />

          <Table cellComponent={cellComponent} />
          <TableHeaderRow showSortingControls />

          <TableEditRow />
          <TableEditColumn
            showAddCommand={!isUnavailable}
            showEditCommand
            showDeleteCommand
            messages={editColumnMessages}
            cellComponent={editCellComponent}
          />

          <TableFixedColumns leftColumns={['name']} />

          {/* TODO -micros, fiber etc <RowDetailState />
          <TableRowDetail
            contentComponent={({ row }) => <div>Details for {row.name}</div>}
          /> */}

          <PagingPanel pageSizes={pageSizes} />

          <Toolbar />
          <SearchPanel />
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
