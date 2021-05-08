import React from 'react';
import { Row, Column } from '../../style/table';
import { Button } from '../../style/buttons';
import { Error } from '../Notification';
import { Number, Weight } from '../../style/inputs';

export default class MeasurementAdder extends React.Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      height: 0,
      waist: 0,
      hips: 0,
      rightBicep: 0,
      leftBicep: 0,
      rightForearm: 0,
      leftForearm: 0,
      shoulders: 0,
      chest: 0,
      neck: 0,
      error: '',
    };
  }

  weightChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.weight;
    this.setState({ weight: input });
  };

  heightChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.height;
    this.setState({ height: input });
  };

  waistChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.waist;
    this.setState({ waist: input });
  };

  hipsChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.hips;
    this.setState({ hips: input });
  };

  rightBicepChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.rightBicep;
    this.setState({ rightBicep: input });
  };

  leftBicepChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.leftBicep;
    this.setState({ leftBicep: input });
  };

  rightForearmChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.rightForearm;
    this.setState({ rightForearm: input });
  };

  leftForearmChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.leftForearm;
    this.setState({ leftForearm: input });
  };

  shouldersChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.shoulders;
    this.setState({ shoulders: input });
  };

  chestChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.chest;
    this.setState({ chest: input });
  };

  neckChange = (evt) => {
    const input = evt.target.validity.valid
      ? evt.target.value
      : this.state.neck;
    this.setState({ neck: input });
  };

  submitMeasurement = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/measurement/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          weight: this.state.weight > 0 ? this.state.weight : undefined,
          height: this.state.height > 0 ? this.state.height : undefined,
          waist: this.state.waist > 0 ? this.state.waist : undefined,
          hips: this.state.hips > 0 ? this.state.hips : undefined,
          rightBicep:
            this.state.rightBicep > 0 ? this.state.rightBicep : undefined,
          leftBicep:
            this.state.leftBicep > 0 ? this.state.leftBicep : undefined,
          rightForearm:
            this.state.rightForearm > 0 ? this.state.rightForearm : undefined,
          leftForearm:
            this.state.leftForearm > 0 ? this.state.leftForearm : undefined,
          shoulders:
            this.state.shoulders > 0 ? this.state.shoulders : undefined,
          chest: this.state.chest > 0 ? this.state.chest : undefined,
          neck: this.state.neck > 0 ? this.state.neck : undefined,
        }),
      }
    );
    if (response.status === 200) window.location = '/measurementTracker';
    else {
      const data = await response.json();
      this.setState({ error: data.error });
    }
  };

  render() {
    return (
      <div>
        <Row columns={2}>
          <Column span={2}>
            <Error
              text={this.state.error}
              dismiss={() => this.setState({ error: '' })}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Weight</Column>
          <Column>
            <Weight
              name="weight"
              value={this.state.weight}
              onChange={this.weightChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Height</Column>
          <Column>
            <Number
              name="height"
              min="0"
              step="0.1"
              value={this.state.height}
              onChange={this.heightChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Waist</Column>
          <Column>
            <Number
              name="waist"
              min="0"
              step="0.1"
              value={this.state.waist}
              onChange={this.waistChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Hips</Column>
          <Column>
            <Number
              name="hips"
              min="0"
              step="0.1"
              value={this.state.hips}
              onChange={this.hipsChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Right Bicep</Column>
          <Column>
            <Number
              name="rightBicep"
              min="0"
              step="0.1"
              value={this.state.rightBicep}
              nge={this.rightBicepChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Left Bicep</Column>
          <Column>
            <Number
              name="leftBicep"
              min="0"
              step="0.1"
              value={this.state.leftBicep}
              onChange={this.leftBicepChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Right Forearm</Column>
          <Column>
            <Number
              name="rightForearm"
              min="0"
              step="0.1"
              value={this.state.rightForearm}
              onChange={this.rightForearmChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Left Forearm</Column>
          <Column>
            <Number
              name="leftForearm"
              min="0"
              step="0.1"
              value={this.state.leftForearm}
              onChange={this.leftForearmChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Shoulders</Column>
          <Column>
            <Number
              name="shoulders"
              min="0"
              step="0.1"
              value={this.state.shoulders}
              onChange={this.shouldersChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Chest</Column>
          <Column>
            <Number
              name="chest"
              min="0"
              step="0.1"
              value={this.state.chest}
              onChange={this.chestChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Neck</Column>
          <Column>
            <Number
              name="neck"
              min="0"
              step="0.1"
              value={this.state.neck}
              onChange={this.neckChange.bind(this)}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column span={2}>
            <Button onClick={this.submitMeasurement.bind(this)}>
              Add Measurements
            </Button>
          </Column>
        </Row>
      </div>
    );
  }
}
