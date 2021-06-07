import React from 'react';
import { Row } from '../../style/table';
import { Button } from '../../style/buttons';
import { Error } from '../../style/notification';
import { Length, Weight } from '../../style/inputs';
import axios from 'axios';

export default class MeasurementAdder extends React.Component {
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
      error: '',
    };
  }

  onChange = (evt) =>
    this.setState({
      [evt.target.name]: evt.target.validity.valid
        ? evt.target.value !== ''
          ? evt.target.value
          : undefined
        : this.state[evt.target.name],
    });

  submitMeasurement = async () => {
    try {
      await axios.post('/measurement/', {
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
      });
      window.location = '/measurementTracker';
    } catch (err) {
      if (err.response.status === 400) console.error(err.response.data.error);
      else console.error(err.response);
    }
  };

  render() {
    return (
      <div>
        <Error
          text={this.state.error}
          dismiss={() => this.setState({ error: '' })}
        />
        <Weight
          name="weight"
          value={this.state.weight}
          onChange={this.onChange}
          label="Weight"
          unit="kg"
        />
        <Length
          name="height"
          value={this.state.height}
          onChange={this.onChange}
          label="Height"
          unit="cm"
        />
        <Length
          name="waist"
          value={this.state.waist}
          onChange={this.onChange}
          label="Waist"
          unit="cm"
        />
        <Length
          name="hips"
          value={this.state.hips}
          onChange={this.onChange}
          label="Hips"
          unit="cm"
        />
        <Length
          name="rightBicep"
          value={this.state.rightBicep}
          nge={this.onChange}
          label="Right Bicep"
          unit="cm"
        />
        <Length
          name="leftBicep"
          value={this.state.leftBicep}
          onChange={this.onChange}
          label="Left Bicep"
          unit="cm"
        />
        <Length
          name="rightForearm"
          value={this.state.rightForearm}
          onChange={this.onChange}
          label="Right Forearm"
          unit="cm"
        />
        <Length
          name="leftForearm"
          value={this.state.leftForearm}
          onChange={this.onChange}
          label="Left Forearm"
          unit="cm"
        />
        <Length
          name="shoulders"
          value={this.state.shoulders}
          onChange={this.onChange}
          label="Shoulders"
          unit="cm"
        />
        <Length
          name="chest"
          value={this.state.chest}
          onChange={this.onChange}
          label="Chest"
          unit="cm"
        />
        <Length
          name="neck"
          value={this.state.neck}
          onChange={this.onChange}
          label="Neck"
          unit="cm"
        />
        <Row>
          <Button onClick={this.submitMeasurement.bind(this)}>
            Add Measurements
          </Button>
        </Row>
      </div>
    );
  }
}
