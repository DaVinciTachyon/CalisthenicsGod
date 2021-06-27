import React from 'react'
import { connect } from 'react-redux'
import { getExercises } from '../../../stateManagement/reducers/exercises'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { Title } from '../../../style/table'
import { SetsTypeProvider } from '../../gridUtil'

class Stage extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: [
        { name: 'sets', title: 'Sets' },
        {
          name: 'weight',
          title: 'Weight',
          getCellValue: (row) =>
            row.sets?.length > 0 && row.sets[0].weight
              ? row.sets[0].weight > 0
                ? 'Weighted'
                : 'Assisted'
              : 'Bodyweight',
        },
        {
          name: 'variation',
          title: 'Variation',
          getCellValue: (row) =>
            row.variation ||
            (row.motionType?.frontalPlane === 'rotational'
              ? 'Bidirectional'
              : row.motionType?.motion === 'isotonic'
              ? 'Isotonic'
              : 'Standard'),
        },
        {
          name: 'sagittalPlane',
          title: 'Sagittal Plane',
          getCellValue: (row) => row.sagittalPlane || 'Bilateral',
        },
        { name: 'name', title: 'Name' },
        {
          name: 'intraset',
          title: 'Intraset Rest',
          getCellValue: (row) => row.rest.intraset,
        },
        {
          name: 'interset',
          title: 'Interset Rest',
          getCellValue: (row) => row.rest.interset,
        },
      ],
    }
  }

  componentDidMount() {
    this.props.getExercises()
  }

  render() {
    const { columns } = this.state
    return (
      <>
        <Title>{this.props.details.name}</Title>
        <Grid
          rows={this.props.details.exercises.map((exercise) => {
            const fullExercise = this.props.exercises.find(
              (ex) => ex._id === exercise.id,
            )
            return { ...fullExercise, ...exercise }
          })}
          columns={columns}
        >
          <Table />
          <TableHeaderRow />

          <SetsTypeProvider for={['sets']} />
        </Grid>
      </>
    )
  }
}

export default connect(({ exercises }) => ({ exercises }), {
  getExercises,
})(Stage)
