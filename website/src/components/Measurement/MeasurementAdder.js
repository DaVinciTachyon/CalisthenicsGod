import React from 'react'
import { Row } from '../../style/table'
import { Button } from '../../style/buttons'
import { Length, Weight } from '../../style/inputs'
import { connect } from 'react-redux'
import { addMeasurements } from '../../stateManagement/reducers/measurements'

class MeasurementAdder extends React.Component {
  constructor() {
    super()
    this.state = {
      weight: undefined,
      height: undefined,
      waist: undefined,
      hips: undefined,
      rightBicep: undefined,
      leftBicep: undefined,
      rightForearm: undefined,
      leftForearm: undefined,
      shoulders: undefined,
      chest: undefined,
      neck: undefined,
    }
  }

  onChange = (evt) =>
    this.setState({
      [evt.target.name]: evt.target.value,
    })

  submitMeasurement = async () => {
    this.props.addMeasurements({
      weight: this.state.weight,
      height: this.state.height,
      waist: this.state.waist,
      hips: this.state.hips,
      rightBicep: this.state.rightBicep,
      leftBicep: this.state.leftBicep,
      rightForearm: this.state.rightForearm,
      leftForearm: this.state.leftForearm,
      shoulders: this.state.shoulders,
      chest: this.state.chest,
      neck: this.state.neck,
    })
  }

  render() {
    return (
      <div>
        <Row columns={2}>
          <Weight
            name="weight"
            value={this.state.weight}
            onChange={this.onChange}
            label="Weight"
            unit="kg"
            fullWidth
          />
          <Length
            name="height"
            value={this.state.height}
            onChange={this.onChange}
            label="Height"
            unit="cm"
            fullWidth
          />
          <Length
            name="waist"
            value={this.state.waist}
            onChange={this.onChange}
            label="Waist"
            unit="cm"
            fullWidth
          />
          <Length
            name="hips"
            value={this.state.hips}
            onChange={this.onChange}
            label="Hips"
            unit="cm"
            fullWidth
          />
          <Length
            name="rightBicep"
            value={this.state.rightBicep}
            nge={this.onChange}
            label="Right Bicep"
            unit="cm"
            fullWidth
          />
          <Length
            name="leftBicep"
            value={this.state.leftBicep}
            onChange={this.onChange}
            label="Left Bicep"
            unit="cm"
            fullWidth
          />
          <Length
            name="rightForearm"
            value={this.state.rightForearm}
            onChange={this.onChange}
            label="Right Forearm"
            unit="cm"
            fullWidth
          />
          <Length
            name="leftForearm"
            value={this.state.leftForearm}
            onChange={this.onChange}
            label="Left Forearm"
            unit="cm"
            fullWidth
          />
          <Length
            name="shoulders"
            value={this.state.shoulders}
            onChange={this.onChange}
            label="Shoulders"
            unit="cm"
            fullWidth
          />
          <Length
            name="chest"
            value={this.state.chest}
            onChange={this.onChange}
            label="Chest"
            unit="cm"
            fullWidth
          />
          <Length
            name="neck"
            value={this.state.neck}
            onChange={this.onChange}
            label="Neck"
            unit="cm"
            fullWidth
          />
        </Row>
        <Button onClick={this.submitMeasurement} fullWidth>
          Add Measurements
        </Button>
      </div>
    )
  }
}

export default connect(() => ({}), {
  addMeasurements,
})(MeasurementAdder)
