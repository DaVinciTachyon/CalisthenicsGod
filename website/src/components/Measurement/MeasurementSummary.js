import React from 'react';
import Card from '../../style/card';
import { Row } from '../../style/table';
import { Button } from '../../style/buttons';
import { Weight, Length } from '../../style/inputs';
import axios from 'axios';

export default class MeasurementSummary extends React.Component {
  constructor() {
    super();
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
    };
  }

  componentDidMount() {
    this.getMeasurements();
  }

  getMeasurements = async () => {
    try {
      const data = (await axios.get('/measurement/')).data;
      Object.keys(data).forEach((name) =>
        this.setState({ [name]: data[name] })
      );
    } catch (err) {
      if (err.response.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  render() {
    return (
      <>
        <Card>
          {this.state.weight > 0 && (
            <Weight
              label="Weight"
              unit="kg"
              value={this.state.weight}
              readOnly
            />
          )}
          {this.state.height > 0 && (
            <Length
              label="Height"
              unit="cm"
              value={this.state.height}
              readOnly
            />
          )}
          {this.state.waist > 0 && (
            <Length label="Waist" unit="cm" value={this.state.waist} readOnly />
          )}
          {this.state.hips > 0 && (
            <Length label="Hips" unit="cm" value={this.state.hips} readOnly />
          )}
          {this.state.rightBicep > 0 && (
            <Length
              label="Right Bicep"
              unit="cm"
              value={this.state.rightBicep}
              readOnly
            />
          )}
          {this.state.leftBicep > 0 && (
            <Length
              label="Left Bicep"
              unit="cm"
              value={this.state.leftBicep}
              readOnly
            />
          )}
          {this.state.rightForearm > 0 && (
            <Length
              label="Right Forearm"
              unit="cm"
              value={this.state.rightForearm}
              readOnly
            />
          )}
          {this.state.leftForearm > 0 && (
            <Length
              label="Left Forearm"
              unit="cm"
              value={this.state.leftForearm}
              readOnly
            />
          )}
          {this.state.shoulders > 0 && (
            <Length
              label="Shoulders"
              unit="cm"
              value={this.state.shoulders}
              readOnly
            />
          )}
          {this.state.chest > 0 && (
            <Length label="Chest" unit="cm" value={this.state.chest} readOnly />
          )}
          {this.state.neck > 0 && (
            <Length label="Neck" unit="cm" value={this.state.neck} readOnly />
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
