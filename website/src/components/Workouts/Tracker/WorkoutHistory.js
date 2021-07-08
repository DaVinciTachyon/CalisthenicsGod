import React from 'react'
import Workout from './Workout'
import { connect } from 'react-redux'
import { getWorkouts } from '../../../stateManagement/reducers/workouts'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  RowDetailState,
} from '@devexpress/dx-react-grid'

class WorkoutHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      columns: [{ name: 'date', title: 'Date' }],
      pageSizes: [10, 20],
    }
  }

  componentDidMount() {
    this.props.getWorkouts()
  }

  render() {
    const { columns, pageSizes } = this.state
    return (
      <Grid rows={this.props.workouts.history} columns={columns}>
        <SortingState
          defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
        />
        <IntegratedSorting />

        <PagingState defaultCurrentPage={0} pageSize={pageSizes[0]} />
        <IntegratedPaging />

        <RowDetailState />

        <Table />
        <TableHeaderRow showSortingControls />
        <TableRowDetail
          contentComponent={({ row }) => <Workout details={row} />}
        />

        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    )
  }
}

export default connect(({ workouts }) => ({ workouts }), {
  getWorkouts,
})(WorkoutHistory)
