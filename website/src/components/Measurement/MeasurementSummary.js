import React from "react";
import Modal from "../Modal";
import MeasurementAdder from "./MeasurementAdder";

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
      newMeasurements: false,
    };
  }

  componentDidMount() {
    this.getMeasurements();
  }

  addMeasurement = () => {
    this.newMeasurements();
    this.getMeasurements();
    this.props.addMeasurement();
  };

  newMeasurements = () => {
    this.setState({
      newMeasurements: !this.state.newMeasurements,
    });
  };

  getMeasurements = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    };
    fetch("http://localhost:8080/measurement/", requestOptions)
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
      <div>
        <div className="card">
          <div className="measurements">
            {this.state.weight > 0 && (
              <div className="measurement">
                <div className="measureLabel">Weight</div>
                <div className="measureValue">{this.state.weight}</div>
              </div>
            )}
            {this.state.height > 0 && (
              <div className="measurement">
                <div className="measureLabel">Height</div>
                <div className="measureValue">{this.state.height}</div>
              </div>
            )}
            {this.state.waist > 0 && (
              <div className="measurement">
                <div className="measureLabel">Waist</div>
                <div className="measureValue">{this.state.waist}</div>
              </div>
            )}
            {this.state.hips > 0 && (
              <div className="measurement">
                <div className="measureLabel">Hips</div>
                <div className="measureValue">{this.state.hips}</div>
              </div>
            )}
            {this.state.rightBicep > 0 && (
              <div className="measurement">
                <div className="measureLabel">Right Flexed Bicep</div>
                <div className="measureValue">{this.state.rightBicep}</div>
              </div>
            )}
            {this.state.leftBicep > 0 && (
              <div className="measurement">
                <div className="measureLabel">Left Flexed Bicep</div>
                <div className="measureValue">{this.state.leftBicep}</div>
              </div>
            )}
            {this.state.rightForearm > 0 && (
              <div className="measurement">
                <div className="measureLabel">Right Forearm</div>
                <div className="measureValue">{this.state.rightForearm}</div>
              </div>
            )}
            {this.state.leftForearm > 0 && (
              <div className="measurement">
                <div className="measureLabel">Left Forearm</div>
                <div className="measureValue">{this.state.leftForearm}</div>
              </div>
            )}
            {this.state.shoulders > 0 && (
              <div className="measurement">
                <div className="measureLabel">Shoulders</div>
                <div className="measureValue">{this.state.shoulders}</div>
              </div>
            )}
            {this.state.chest > 0 && (
              <div className="measurement">
                <div className="measureLabel">Chest</div>
                <div className="measureValue">{this.state.chest}</div>
              </div>
            )}
            {this.state.neck > 0 && (
              <div className="measurement">
                <div className="measureLabel">Neck</div>
                <div className="measureValue">{this.state.neck}</div>
              </div>
            )}
            <button onClick={this.newMeasurements}>New Measurements</button>
          </div>
        </div>
        <Modal
          isOpen={this.state.newMeasurements}
          toggle={this.newMeasurements}
        >
          <MeasurementAdder addMeasurement={this.addMeasurement} />
          <button onClick={this.newMeasurements}>Cancel</button>
        </Modal>
      </div>
    );
  }
}
