import React from 'react';
import Card from '../../style/card';
import { Row, Column } from '../../style/table';
import { Link } from 'react-router-dom';
import { Button } from '../../style/buttons';

export default class MeasurementSummary extends React.Component {
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
    };
  }

  componentDidMount() {
    this.getMeasurements();
  }

  getMeasurements = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authToken'),
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/measurement/`, requestOptions)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          weight: data.weight,
          height: data.height,
          waist: data.waist,
          hips: data.hips,
          rightBicep: data.rightBicep,
          leftBicep: data.leftBicep,
          rightForearm: data.rightForearm,
          leftForearm: data.leftForearm,
          shoulders: data.shoulders,
          chest: data.chest,
          neck: data.neck,
        })
      );
  };

  render() {
    return (
      <>
        <Card>
          {this.state.weight > 0 && (
            <Row columns={2}>
              <Column>Weight</Column>
              <Column>{this.state.weight}</Column>
            </Row>
          )}
          {this.state.height > 0 && (
            <Row columns={2}>
              <Column>Height</Column>
              <Column>{this.state.height}</Column>
            </Row>
          )}
          {this.state.waist > 0 && (
            <Row columns={2}>
              <Column>Waist</Column>
              <Column>{this.state.waist}</Column>
            </Row>
          )}
          {this.state.hips > 0 && (
            <Row columns={2}>
              <Column>Hips</Column>
              <Column>{this.state.hips}</Column>
            </Row>
          )}
          {this.state.rightBicep > 0 && (
            <Row columns={2}>
              <Column>Right Bicep</Column>
              <Column>{this.state.rightBicep}</Column>
            </Row>
          )}
          {this.state.leftBicep > 0 && (
            <Row columns={2}>
              <Column>Left Bicep</Column>
              <Column>{this.state.leftBicep}</Column>
            </Row>
          )}
          {this.state.rightForearm > 0 && (
            <Row columns={2}>
              <Column>Right Forearm</Column>
              <Column>{this.state.rightForearm}</Column>
            </Row>
          )}
          {this.state.leftForearm > 0 && (
            <Row columns={2}>
              <Column>Left Forearm</Column>
              <Column>{this.state.leftForearm}</Column>
            </Row>
          )}
          {this.state.shoulders > 0 && (
            <Row columns={2}>
              <Column>Shoulders</Column>
              <Column>{this.state.shoulders}</Column>
            </Row>
          )}
          {this.state.chest > 0 && (
            <Row columns={2}>
              <Column>Chest</Column>
              <Column>{this.state.chest}</Column>
            </Row>
          )}
          {this.state.neck > 0 && (
            <Row columns={2}>
              <Column>Neck</Column>
              <Column>{this.state.neck}</Column>
            </Row>
          )}
          <Row columns={2}>
            <Column span={2}>
              <Link to="/measurementTracker/new">
                <Button>New Measurements</Button>
              </Link>
            </Column>
          </Row>
        </Card>
      </>
    );
  }
}
