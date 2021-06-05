import React from 'react';
import { Row } from '../../../style/table';
import { Number } from '../../../style/inputs';

export default class SetEditor extends React.Component {
  constructor() {
    super();
    this.state = { repetitions: 1, time: 1, distance: 1, weight: 1 };
  }

  componentDidMount() {
    if (this.props.readOnly) this.setState(this.props.value);
    else this.onUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type)
      this.setState({ repetitions: 1, time: 1, distance: 1, weight: 1 });
  }

  onUpdate = () =>
    this.props.onUpdate({
      repetitions: ['isotonic', 'eccentric'].includes(this.props.type)
        ? this.state.repetitions
        : undefined,
      time: ['isometric', 'eccentric', 'distance', 'timed'].includes(
        this.props.type
      )
        ? this.state.time
        : undefined,
      distance: ['distance'].includes(this.props.type)
        ? this.state.distance
        : undefined,
      weight: this.props.isWeighted ? this.state.weight : undefined,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  render() {
    let columns = this.props.isWeighted ? 1 : 0;
    if (['isotonic', 'isometric', 'timed'].includes(this.props.type))
      columns += 1;
    else if (['eccentric', 'distance'].includes(this.props.type)) columns += 2;
    return (
      <Row columns={columns}>
        {['isotonic', 'eccentric'].includes(this.props.type) && (
          <Number
            name="repetitions"
            min={1}
            value={this.state.repetitions}
            onChange={this.onChange}
            unit="r"
            readOnly={this.props.readOnly}
          />
        )}
        {['distance'].includes(this.props.type) && (
          <Number
            name="distance"
            min={1}
            value={this.state.distance}
            onChange={this.onChange}
            unit="m"
            readOnly={this.props.readOnly}
          />
        )}
        {['isometric', 'eccentric', 'distance', 'timed'].includes(
          this.props.type
        ) && (
          <Number
            name="time"
            min={1}
            value={this.state.time}
            onChange={this.onChange}
            unit="s"
            readOnly={this.props.readOnly}
          />
        )}
        {this.props.isWeighted && (
          <Number
            name="weight"
            min={1}
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
