import React from 'react'
import { connect } from 'react-redux'
import { getExercises } from '../../../stateManagement/reducers/exercises'
import { getStages } from '../../../stateManagement/reducers/stages'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'
import { Title } from '../../../style/table'
import {
  WeightedTypeProvider,
  VariationTypeProvider,
  SagittalPlaneTypeProvider,
  ExerciseTypeProvider,
  TimeTypeProvider,
  SetsTypeProvider,
} from '../../gridUtil'

class Stage extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: [
        { name: 'sets', title: 'Sets' },
        { name: 'weight', title: 'Weight' },
        { name: 'variation', title: 'Variation' },
        { name: 'sagittalPlane', title: 'Sagittal Plane' },
        { name: 'id', title: 'Exercise' },
        {
          name: 'intrasetRest',
          title: 'Intraset Rest',
          getCellValue: (row) => row.rest.intraset,
        },
        {
          name: 'intersetRest',
          title: 'Interset Rest',
          getCellValue: (row) => row.rest.interset,
        },
      ],
    }
  }

  componentDidMount() {
    this.props.getExercises()
    this.props.getStages()
  }

  render() {
    const { columns } = this.state
    return (
      <>
        <Title>
          {this.props.stages.find(
            (stage) => stage._id === this.props.details.id,
          )?.name || 'NaN'}
        </Title>
        <Grid rows={this.props.details.exercises} columns={columns}>
          <SetsTypeProvider for={['sets']} />
          <WeightedTypeProvider for={['weight']} />
          <VariationTypeProvider for={['variation']} />
          <SagittalPlaneTypeProvider for={['sagittalPlane']} />
          <ExerciseTypeProvider for={['id']} />
          <TimeTypeProvider for={['intrasetRest', 'intersetRest']} />

          <Table />
          <TableHeaderRow />

          <SetsTypeProvider for={['sets']} />
        </Grid>
      </>
    )
  }
}

export default connect(({ exercises, stages }) => ({ exercises, stages }), {
  getExercises,
  getStages,
})(Stage)
