import React from 'react';
import { Row, Column } from '../../../style/table';
import { Number } from '../../../style/inputs';

export default class SetEditor extends React.Component {
  constructor() {
    super();
    this.state = { repetitions: 1, time: 1 };
  }

  componentDidMount() {
    this.onUpdate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type)
      this.setState({ repetitions: 1, time: 1 });
  }

  onUpdate = () =>
    this.props.onUpdate({
      repetitions: this.state.repetitions,
      time: this.state.time,
    });

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value });
    this.onUpdate();
  };

  render() {
    if (this.props.type === 'isotonic')
      return (
        <Row>
          <Column>
            <Number
              name="repetitions"
              min={1}
              value={this.state.repetitions}
              onChange={this.onChange}
            />
          </Column>
        </Row>
      );
    else if (this.props.type === 'isometric')
      return (
        <Row columns={2}>
          <Column>
            <Number
              name="time"
              min={1}
              value={this.state.time}
              onChange={this.onChange}
            />
          </Column>
          <Column>s</Column>
        </Row>
      );
    return (
      <Row columns={4}>
        <Column>
          <Number
            name="repetitions"
            min={1}
            value={this.state.repetitions}
            onChange={this.onChange}
          />
        </Column>
        <Column>*</Column>
        <Column>
          <Number
            name="time"
            min={1}
            value={this.state.time}
            onChange={this.onChange}
          />
        </Column>
        <Column>s</Column>
      </Row>
    );
  }
}
