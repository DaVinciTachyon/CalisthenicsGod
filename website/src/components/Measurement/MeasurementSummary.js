import React from 'react';
import Card from '../../style/card';
import { Row } from '../../style/table';
import { Button } from '../../style/buttons';
import { Weight, Length } from '../../style/inputs';
import { connect } from 'react-redux';
import { getMeasurements } from '../../stateManagement/reducers/measurements';

class MeasurementSummary extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getMeasurements();
  }

  render() {
    return (
      <>
        <Card>
          {this.props.measurements.weight?.length > 0 && (
            <Weight
              label="Weight"
              unit="kg"
              value={this.props.measurements.weight[0].value}
              readOnly
            />
          )}
          {this.props.measurements.height?.length > 0 && (
            <Length
              label="Height"
              unit="cm"
              value={this.props.measurements.height[0].value}
              readOnly
            />
          )}
          {this.props.measurements.waist?.length > 0 && (
            <Length
              label="Waist"
              unit="cm"
              value={this.props.measurements.waist[0].value}
              readOnly
            />
          )}
          {this.props.measurements.hips?.length > 0 && (
            <Length
              label="Hips"
              unit="cm"
              value={this.props.measurements.hips[0].value}
              readOnly
            />
          )}
          {this.props.measurements.rightBicep?.length > 0 && (
            <Length
              label="Right Bicep"
              unit="cm"
              value={this.props.measurements.rightBicep[0].value}
              readOnly
            />
          )}
          {this.props.measurements.leftBicep?.length > 0 && (
            <Length
              label="Left Bicep"
              unit="cm"
              value={this.props.measurements.leftBicep[0].value}
              readOnly
            />
          )}
          {this.props.measurements.rightForearm?.length > 0 && (
            <Length
              label="Right Forearm"
              unit="cm"
              value={this.props.measurements.rightForearm[0].value}
              readOnly
            />
          )}
          {this.props.measurements.leftForearm?.length > 0 && (
            <Length
              label="Left Forearm"
              unit="cm"
              value={this.props.measurements.leftForearm[0].value}
              readOnly
            />
          )}
          {this.props.measurements.shoulders?.length > 0 && (
            <Length
              label="Shoulders"
              unit="cm"
              value={this.props.measurements.shoulders[0].value}
              readOnly
            />
          )}
          {this.props.measurements.chest?.length > 0 && (
            <Length
              label="Chest"
              unit="cm"
              value={this.props.measurements.chest[0].value}
              readOnly
            />
          )}
          {this.props.measurements.neck?.length > 0 && (
            <Length
              label="Neck"
              unit="cm"
              value={this.props.measurements.neck[0].value}
              readOnly
            />
          )}
          <Row>
            <Button
              onClick={() => (window.location = '/measurementTracker/new')}
            >
              New Measurements
            </Button>
          </Row>
        </Card>
      </>
    );
  }
}

export default connect(({ measurements }) => ({ measurements }), {
  getMeasurements,
})(MeasurementSummary);
