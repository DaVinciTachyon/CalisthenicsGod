import React from 'react';
import { Row } from '../../../style/table';
import { Number } from '../../../style/inputs';

export default class SetEditor extends React.Component {
  constructor() {
    super();
    this.state = { repetitions: 1, time: 1, distance: 1 };
  }

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type)
      this.setState({ repetitions: 1, time: 1, distance: 1 });
  }

  onUpdate = () =>
    this.props.onUpdate({
      repetitions: this.state.repetitions,
      time: this.state.time,
      distance: this.state.distance,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  render() {
    if (this.props.type === 'isotonic')
      return (
        <Number
          name="repetitions"
          min={1}
          value={this.state.repetitions}
          onChange={this.onChange}
          unit="r"
        />
      );
    else if (this.props.type === 'isometric')
      return (
        <Number
          name="time"
          min={1}
          value={this.state.time}
          onChange={this.onChange}
          unit="s"
        />
      );
    else if (this.props.type === 'distance')
      return (
        <Row columns={3}>
          <Number
            name="distance"
            min={1}
            value={this.state.distance}
            onChange={this.onChange}
            unit="m"
          />
          <span>in</span>
          <Number
            name="time"
            min={1}
            value={this.state.time}
            onChange={this.onChange}
            unit="s"
          />
        </Row>
      );
    return (
      <Row columns={3}>
        <Number
          name="repetitions"
          min={1}
          value={this.state.repetitions}
          onChange={this.onChange}
          unit="r"
        />
        <span>*</span>
        <Number
          name="time"
          min={1}
          value={this.state.time}
          onChange={this.onChange}
          unit="s"
        />
      </Row>
    );
  }
}
