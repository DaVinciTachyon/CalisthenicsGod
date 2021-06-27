import React from 'react'
import ExerciseAdder from './ExerciseAdder'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  SearchPanel,
  Toolbar,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
  RowDetailState,
  EditingState,
} from '@devexpress/dx-react-grid'
import {
  Plugin,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
  Action,
} from '@devexpress/dx-react-core'
import { connect } from 'react-redux'
import {
  addExercise,
  getExercises,
  modifyExercise,
} from '../../../stateManagement/reducers/exercises'
import { withStyles } from '@material-ui/core/styles'
import {
  TableCell,
  IconButton,
  ButtonGroup,
  FormControl,
} from '@material-ui/core'
import { Cancel, Edit } from '@material-ui/icons'
import { Button, ErrorButton } from '../../../style/buttons'
import { Text, Select, Radio } from '../../../style/inputs'
import StageSelect from '../StageSelect'
import ExerciseSelect from '../ExerciseSelect'
import { Row, Column } from '../../../style/table'
import classNames from 'clsx'
import { validate } from '../../gridUtil'

class Exercises extends React.Component {
  constructor() {
    super()
    this.state = {
      isAdding: false,
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'abbreviation', title: 'Abbreviation' },
        { name: 'description', title: 'Description' },
      ],
      pageSizes: [10, 20],
      editExtensions: [
        {
          columnName: 'name',
          createRowChange: (row, value) => ({ ...row, name: value }),
        },
        {
          columnName: 'abbreviation',
          createRowChange: (row, value) => ({ ...row, abbreviation: value }),
        },
        {
          columnName: 'description',
          createRowChange: (row, value) => ({ ...row, description: value }),
        },
        {
          columnName: 'hasComponents',
          createRowChange: (row, value) => {
            const val = value === 'true'
            return {
              ...row,
              hasComponents: val,
              componentExercises: val ? [] : undefined,
              transversePlane: val ? undefined : row.transversePlane,
              frontalPlane: val ? undefined : row.frontalPlane,
              verticality: val ? undefined : row.verticality,
              motion: val ? undefined : row.motion,
              kineticChain: val ? undefined : row.kineticChain,
              sagittalPlane: val ? undefined : row.sagittalPlane,
            }
          },
        },
        {
          columnName: 'componentExercises',
          createRowChange: (row, value) => ({
            ...row,
            componentExercises: value,
          }),
        },
        {
          columnName: 'transversePlane',
          createRowChange: (row, value) => ({ ...row, transversePlane: value }),
        },
        {
          columnName: 'frontalPlane',
          createRowChange: (row, value) => ({ ...row, frontalPlane: value }),
        },
        {
          columnName: 'verticality',
          createRowChange: (row, value) => ({ ...row, verticality: value }),
        },
        {
          columnName: 'motion',
          createRowChange: (row, value) => ({ ...row, motion: value }),
        },
        {
          columnName: 'kineticChain',
          createRowChange: (row, value) => ({ ...row, kineticChain: value }),
        },
        {
          columnName: 'sagittalPlane',
          createRowChange: (row, value) => ({ ...row, sagittalPlane: value }),
        },
        {
          columnName: 'potentialStages',
          createRowChange: (row, value) => ({ ...row, potentialStages: value }),
        },
        {
          columnName: 'requirements',
          createRowChange: (row, value) => ({ ...row, requirements: value }),
        },
      ],
      errors: [],
    }
  }

  componentDidMount() {
    this.props.getExercises()
  }

  DetailEditCell = () => (
    <Plugin name="DetailEditCell">
      <Action
        name="toggleDetailRowExpanded"
        action={(
          { rowId },
          { expandedDetailRowIds },
          { startEditRows, stopEditRows },
        ) => {
          const rowIds = [rowId]
          const isCollapsing = expandedDetailRowIds.indexOf(rowId) > -1
          if (isCollapsing) {
            stopEditRows({ rowIds })
          } else {
            startEditRows({ rowIds })
          }
        }}
      />
      <Template
        name="tableCell"
        predicate={({ tableRow }) => tableRow.type === TableRowDetail.ROW_TYPE}
      >
        {(params) => (
          <TemplateConnector>
            {(
              { tableColumns, createRowChange, rowChanges },
              {
                changeRow,
                commitChangedRows,
                cancelChangedRows,
                toggleDetailRowExpanded,
              },
            ) => {
              if (tableColumns.indexOf(params.tableColumn) !== 0) return null
              const {
                tableRow: { rowId },
              } = params
              const row = { ...params.tableRow.row, ...rowChanges[rowId] }

              const processValueChange = ({ target: { name, value } }) => {
                const changeArgs = {
                  rowId,
                  change: createRowChange(row, value, name),
                }
                changeRow(changeArgs)
              }

              const applyChanges = () => commitChangedRows({ rowIds: [rowId] })
              const cancelChanges = () => {
                toggleDetailRowExpanded({ rowId })
                cancelChangedRows({ rowIds: [rowId] })
              }

              return (
                <TemplatePlaceholder
                  params={{
                    ...params,
                    row,
                    tableRow: {
                      ...params.tableRow,
                      row,
                    },
                    changeRow,
                    processValueChange,
                    applyChanges,
                    cancelChanges,
                  }}
                />
              )
            }}
          </TemplateConnector>
        )}
      </Template>
    </Plugin>
  )

  DetailContent = ({ row, ...rest }) => {
    const { processValueChange, applyChanges, cancelChanges } = rest
    return (
      <FormControl fullWidth>
        <Row columns={2}>
          <Text
            name="name"
            value={row.name}
            onChange={processValueChange}
            label="Name"
            fullWidth
          />
          <Text
            name="abbreviation"
            value={row.abbreviation}
            onChange={processValueChange}
            label="Abbreviation"
            fullWidth
          />
        </Row>
        <Text
          name="description"
          value={row.description}
          onChange={processValueChange}
          label="Description"
          fullWidth
          multiline
        />
        <Row columns={7}>
          <Radio
            name="hasComponents"
            value={row.hasComponents}
            options={[
              { label: 'Combinational', value: true },
              { label: 'Singular', value: false },
            ]}
            onChange={processValueChange}
          />
          {row.hasComponents === true && (
            <Column span={6}>
              <ExerciseSelect
                name="componentExercises"
                onChange={processValueChange}
                value={row.componentExercises}
                multiple
                label="Component Exercises"
                unavailable={[row._id]}
                fullWidth
              />
            </Column>
          )}
          {row.hasComponents === false && (
            <>
              <Select
                name="transversePlane"
                value={row.transversePlane}
                options={[
                  { label: 'Upper', value: 'upper' },
                  { label: 'Lower', value: 'lower' },
                  { label: 'Core', value: 'core' },
                ]}
                onChange={processValueChange}
                label="Transverse Plane"
              />
              <Select
                name="frontalPlane"
                value={row.frontalPlane}
                options={[
                  { label: 'Push', value: 'push' },
                  { label: 'Pull', value: 'pull' },
                  { label: 'Rotational', value: 'rotational' },
                  { label: 'Lateral', value: 'lateral' },
                ]}
                onChange={processValueChange}
                label="Frontal Plane"
              />
              <Select
                name="verticality"
                value={row.verticality}
                options={[
                  { label: 'Horizontal', value: 'horizontal' },
                  { label: 'Vertical', value: 'vertical' },
                ]}
                onChange={processValueChange}
                label="Verticality"
              />
              <Select
                name="motion"
                value={row.motion}
                options={[
                  { label: 'Isometric', value: 'isometric' },
                  { label: 'Isotonic', value: 'isotonic' },
                  { label: 'Distance', value: 'distance' },
                  { label: 'Timed', value: 'timed' },
                ]}
                onChange={processValueChange}
                label="Motion"
              />
              <Select
                name="kineticChain"
                value={row.kineticChain}
                options={[
                  { label: 'Closed', value: 'closed' },
                  { label: 'Open', value: 'open' },
                ]}
                onChange={processValueChange}
                label="Kinetic Chain"
              />
              <Select
                name="sagittalPlane"
                value={row.sagittalPlane}
                options={[
                  { label: 'Bilateral', value: 'bilateral' },
                  { label: 'Unilateral', value: 'unilateral' },
                ]}
                onChange={processValueChange}
                label="Sagittal Plane"
              />
            </>
          )}
        </Row>
        <Row>
          <StageSelect
            name="potentialStages"
            onChange={processValueChange}
            value={row.potentialStages}
            multiple
            label="Potential Stages"
          />
          <ExerciseSelect
            name="requirements"
            onChange={processValueChange}
            value={row.requirements}
            multiple
            label="Requirements"
            fullWidth
          />
        </Row>
        <ButtonGroup orientation="horizontal">
          <Button onClick={applyChanges}>Save</Button>
          <ErrorButton onClick={cancelChanges}>Cancel</ErrorButton>
        </ButtonGroup>
      </FormControl>
    )
  }

  DetailCell = ({
    children,
    changeRow,
    editingRowIds,
    addedRows,
    processValueChange,
    applyChanges,
    cancelChanges,
    ...restProps
  }) => {
    const { row } = restProps
    return (
      <TableRowDetail.Cell {...restProps}>
        {React.cloneElement(children, {
          row,
          changeRow,
          processValueChange,
          applyChanges,
          cancelChanges,
        })}
      </TableRowDetail.Cell>
    )
  }

  ToggleCellBase = ({
    style,
    expanded,
    classes,
    onToggle,
    tableColumn,
    tableRow,
    row,
    className,
    ...restProps
  }) => {
    const handleClick = (e) => {
      e.stopPropagation()
      onToggle()
    }
    return (
      <TableCell
        className={classNames(classes.toggleCell, className)}
        style={style}
        {...restProps}
      >
        <IconButton className={classes.toggleCellButton} onClick={handleClick}>
          {expanded ? <Cancel /> : <Edit />}
        </IconButton>
      </TableCell>
    )
  }

  ToggleCell = withStyles(
    (theme) => ({
      toggleCell: {
        textAlign: 'center',
        textOverflow: 'initial',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: theme.spacing(1),
      },
      toggleCellButton: {
        verticalAlign: 'middle',
        display: 'inline-block',
        padding: theme.spacing(1),
      },
    }),
    { name: 'ToggleCell' },
  )(this.ToggleCellBase)

  commitChanges = ({ changed }) => {
    if (changed)
      Object.entries(changed).forEach((entry) => {
        if (entry[1]) {
          const {
            name,
            abbreviation,
            description,
            componentExercises,
            transversePlane,
            frontalPlane,
            verticality,
            motion,
            kineticChain,
            sagittalPlane,
            potentialStages,
            requirements,
            hasComponents,
          } = entry[1]
          let motionType = {
            transversePlane,
            frontalPlane,
            verticality,
            motion,
            kineticChain,
            sagittalPlane,
          }
          if (hasComponents) motionType = { componentExercises }
          this.props.modifyExercise({
            _id: entry[0],
            name,
            abbreviation,
            description,
            motionType,
            potentialStages,
            requirements,
          })
        }
      })
  }

  render() {
    const { columns, pageSizes, editExtensions } = this.state
    const {
      DetailEditCell,
      DetailCell,
      ToggleCell,
      DetailContent,
      commitChanges,
    } = this
    return (
      <div>
        {!this.state.isAdding && (
          <Button onClick={() => this.setState({ isAdding: true })} fullWidth>
            Add Exercise
          </Button>
        )}
        {this.state.isAdding && (
          <ExerciseAdder
            onSubmit={(exercise) => {
              this.props.addExercise(exercise)
              this.setState({ isAdding: false })
            }}
            onCancel={() => this.setState({ isAdding: false })}
          />
        )}
        <Grid
          rows={this.props.exercises
            .filter((exercise) => exercise.isAvailable)
            .map((exercise) => ({
              ...exercise,
              ...exercise.motionType,
              hasComponents: exercise.motionType.componentExercises?.length > 0,
            }))}
          columns={columns}
          getRowId={(row) => row._id}
        >
          <SearchState />
          <IntegratedFiltering />
          <SortingState
            defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
          />
          <IntegratedSorting />

          <PagingState defaultCurrentPage={0} defaultPageSize={pageSizes[0]} />
          <IntegratedPaging />

          <EditingState
            onRowChangesChange={(edited) =>
              this.setState({ errors: validate(edited, columns) })
            }
            onCommitChanges={commitChanges}
            columnExtensions={editExtensions}
          />

          <Table />
          <TableHeaderRow showSortingControls />

          <RowDetailState />
          <TableRowDetail
            contentComponent={DetailContent}
            cellComponent={DetailCell}
            toggleCellComponent={ToggleCell}
          />

          <DetailEditCell />

          <PagingPanel pageSizes={pageSizes} />

          <Toolbar />
          <SearchPanel />
        </Grid>
      </div>
    )
  }
}

export default connect(({ exercises }) => ({ exercises }), {
  addExercise,
  getExercises,
  modifyExercise,
})(Exercises)
