import React from 'react';
import { Row } from '../../../style/table';
import { Number } from '../../../style/inputs';

export default class SetEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      repetitions: undefined,
      time: undefined,
      distance: undefined,
      weight: undefined,
    };
  }

  async componentDidMount() {
    await this.setParams();
    if (!this.props.readOnly) {
      await this.setState(this.props.value);
      this.onUpdate();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.isWeighted !== this.props.isWeighted
    )
      this.setParams();
  }

  setParams = async () => {
    let repetitions, time, distance, weight;
    if (
      this.props.value?.repetitions ||
      ['isotonic', 'eccentric'].includes(this.props.type) ||
      (!this.props.type && !this.props.readOnly)
    )
      repetitions = this.props.value?.repetitions || 1;
    if (
      this.props.value?.time ||
      ['isometric', 'eccentric', 'distance', 'timed'].includes(this.props.type)
    )
      time = this.props.value?.time || 1;
    if (this.props.value?.distance || ['distance'].includes(this.props.type))
      distance = this.props.value?.distance || 1;
    if (this.props.isWeighted && this.props.isWeighted !== 0)
      weight = this.props.value?.weight ? Math.abs(this.props.value.weight) : 1;
    await this.setState({ repetitions, time, distance, weight });
  };

  onUpdate = () =>
    this.props.onUpdate({
      repetitions: this.state.repetitions,
      time: this.state.time,
      distance: this.state.distance,
      weight:
        this.props.isWeighted && this.props.isWeighted !== 0
          ? this.state.weight * this.props.isWeighted
          : undefined,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  render() {
    return (
      <Row
        columns={
          Object.keys(this.state).filter((key) => this.state[key] !== undefined)
            .length
        }
      >
        {this.state.repetitions && (
          <Number
            name="repetitions"
            min={1}
            value={this.state.repetitions}
            onChange={this.onChange}
            unit="r"
            readOnly={this.props.readOnly}
          />
        )}
        {this.state.distance && (
          <Number
            name="distance"
            min={1}
            value={this.state.distance}
            onChange={this.onChange}
            unit="m"
            readOnly={this.props.readOnly}
          />
        )}
        {this.state.time && (
          <Number
            name="time"
            min={1}
            value={this.state.time}
            onChange={this.onChange}
            unit="s"
            readOnly={this.props.readOnly}
          />
        )}
        {this.state.weight && (
          <Number
            name="weight"
            min={0.1}
            value={this.state.weight}
            onChange={this.onChange}
            unit="kg"
            readOnly={this.props.readOnly}
          />
        )}
      </Row>
    );
  }
}
