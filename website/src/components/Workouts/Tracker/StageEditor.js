import React from 'react'
import { Title } from '../../../style/table'
import { connect } from 'react-redux'
import {
  addCurrentExercise,
  removeCurrentExercise,
  modifyCurrentExercise,
} from '../../../stateManagement/reducers/workouts'
import { getExercises } from '../../../stateManagement/reducers/exercises'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui'
import { EditingState } from '@devexpress/dx-react-grid'
import {
  WeightedTypeProvider,
  VariationTypeProvider,
  SagittalPlaneTypeProvider,
  ExerciseTypeProvider,
  TimeTypeProvider,
  SetsTypeProvider,
} from '../../gridUtil'

class StageEditor extends React.Component {
  constructor() {
    super()
    this.state = {
      errors: [],
      columns: [
        { name: 'sets', title: 'Sets', required: true },
        {
          name: 'weight',
          title: 'Weight',
          required: true,
          getCellValue: (row) => row.weight || 0,
        },
        {
          name: 'variation',
          title: 'Variation',
          required: true,
          getCellValue: (row) => row.variation || 'default',
        },
        {
          name: 'sagittalPlane',
          title: 'Sagittal Plane',
          required: true,
          getCellValue: (row) => row.sagittalPlane || 'default',
        },
        { name: 'id', title: 'Exercise', required: true },
        { name: 'intrasetRest', title: 'Intraset Rest' },
        {
          name: 'intersetRest',
          title: 'Interset Rest',
          required: true,
          getCellValue: (row) => row.intersetRest || 0,
        },
      ],
    }
  }

  componentDidMount() {
    this.props.getExercises()
  }

  commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      added.forEach(
        ({
          sets,
          id,
          variation,
          sagittalPlane,
          intrasetRest,
          intersetRest,
        }) => {
          this.props.addCurrentExercise({
            stageId: this.props.id,
            newLength:
              (this.props.workouts.current.stages.find(
                (stage) => stage.id === this.props.id,
              )?.exercises?.length || 0) + 1,
            exercise: {
              sets,
              id,
              variation: variation !== 'default' ? variation : undefined,
              sagittalPlane:
                sagittalPlane !== 'default' ? sagittalPlane : undefined,
              rest: {
                intraset: intrasetRest,
                interset: intersetRest,
              },
            },
          })
        },
      )
    }
    if (changed)
      Object.entries(changed).forEach((entry) => {
        if (entry[1]) {
          const {
            sets,
            id,
            variation,
            sagittalPlane,
            intrasetRest,
            intersetRest,
          } = entry[1]
          this.props.modifyCurrentExercise({
            stageId: this.props.id,
            index: entry[0],
            exercise: {
              sets,
              id,
              variation: variation !== 'default' ? variation : undefined,
              sagittalPlane:
                sagittalPlane !== 'default' ? sagittalPlane : undefined,
              rest: {
                intraset: intrasetRest,
                interset: intersetRest,
              },
            },
          })
        }
      })
    if (deleted)
      deleted.forEach((index) =>
        this.props.removeCurrentExercise({
          stageId: this.props.id,
          newLength:
            this.props.workouts.current.stages.find(
              (stage) => stage.id === this.props.id,
            )?.exercises?.length - 1,
          index,
        }),
      )
  }

  render() {
    const { commitChanges } = this
    const { columns } = this.state
    console.log(
      this.props.details?.exercises.map((exercise) => ({
        ...exercise,
        variation: exercise.variation || 'default',
        sagittalPlane: exercise.sagittalPlane || 'default',
        intrasetRest: exercise.rest.intraset,
        intersetRest: exercise.rest.interset,
      })) || [],
    )
    return (
      <div>
        <Title>
          {this.props.stages.find((stage) => stage._id === this.props.id).name}
        </Title>
        <Grid
          rows={
            this.props.details?.exercises.map((exercise) => ({
              ...exercise,
              variation: exercise.variation || 'default',
              sagittalPlane: exercise.sagittalPlane || 'default',
              intrasetRest: exercise.rest.intraset,
              intersetRest: exercise.rest.interset,
            })) || []
          }
          columns={columns}
        >
          <EditingState
            onCommitChanges={commitChanges}
            columnExtensions={[
              {
                columnName: 'sets',
                createRowChange: (row, value) => ({ ...row, sets: value }),
              },
              {
                columnName: 'weight',
                createRowChange: (row, value) => ({ ...row, weight: value }),
              },
              {
                columnName: 'variation',
                createRowChange: (row, value) => ({ ...row, variation: value }),
              },

              {
                columnName: 'sagittalPlane',
                createRowChange: (row, value) => ({
                  ...row,
                  sagittalPlane: value,
                }),
              },
              {
                columnName: 'id',
                createRowChange: (row, value) => {
                  const exercise = this.props.exercises.find(
                    (exercise) => exercise._id === row.id,
                  )
                  return {
                    ...row,
                    id: value,
                    variation: 'default',
                    sagittalPlane:
                      exercise?.motionType.sagittalPlane === 'unilateral'
                        ? 'right'
                        : 'default',
                  }
                },
              },
              {
                columnName: 'intrasetRest',
                createRowChange: (row, value) => ({
                  ...row,
                  intrasetRest: value,
                }),
              },
              {
                columnName: 'intersetRest',
                createRowChange: (row, value) => ({
                  ...row,
                  intersetRest: value,
                }),
              },
            ]}
          />
          <SetsTypeProvider for={['sets']} />
          <WeightedTypeProvider for={['weight']} />
          <VariationTypeProvider for={['variation']} />
          <SagittalPlaneTypeProvider for={['sagittalPlane']} />
          <ExerciseTypeProvider for={['id']} />
          <TimeTypeProvider for={['intrasetRest', 'intersetRest']} />

          <Table />
          <TableHeaderRow />

          <TableEditRow />
          <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        </Grid>
      </div>
    )
  }
}

export default connect(
  ({ stages, exercises, workouts }) => ({ stages, exercises, workouts }),
  {
    addCurrentExercise,
    removeCurrentExercise,
    getExercises,
    modifyCurrentExercise,
  },
)(StageEditor)
