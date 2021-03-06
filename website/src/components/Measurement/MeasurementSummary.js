import React from 'react'
import { Paper } from '@material-ui/core'
import { Row } from '../../style/table'
import { Button } from '../../style/buttons'
import { Weight, Length } from '../../style/inputs'
import { connect } from 'react-redux'
import { getMeasurements } from '../../stateManagement/reducers/measurements'
import { Link } from 'react-router-dom'

class MeasurementSummary extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getMeasurements()
  }

  render() {
    return (
      <Paper>
        <Row columns={2}>
          {Object.entries(this.props.measurements).map((entry) => {
            if (entry[1]?.length > 0) {
              if (entry[0] === 'weight')
                return (
                  <Weight
                    label={entry[0]}
                    unit="kg"
                    value={entry[1][0].value}
                    disabled
                    fullWidth
                  />
                )
              return (
                <Length
                  label={entry[0]}
                  unit="cm"
                  value={entry[1][0].value}
                  disabled
                  fullWidth
                />
              )
            }
            return <></>
          })}
        </Row>
        <Link to="/measurementTracker/new">
          <Button fullWidth>New Measurements</Button>
        </Link>
      </Paper>
    )
  }
}

export default connect(({ measurements }) => ({ measurements }), {
  getMeasurements,
})(MeasurementSummary)
