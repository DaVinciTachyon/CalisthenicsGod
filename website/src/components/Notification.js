import React from 'react';
import { Row, Column } from '../style/table';
import { Error as ErrorColours } from '../style/colours';

export default class Notification extends React.Component {
  dismiss = () => {
    this.props.dismiss();
  };

  render() {
    if (this.props.text)
      return (
        <Row columns={4} onClick={this.dismiss} style={this.props.style}>
          <Column span={3}>{this.props.text}</Column>
          <Column onClick={this.dismiss}>✖</Column>
        </Row>
      );
    else return <></>;
  }
}

const Error = (
  { ...props } //TODO styled component
) => (
  <Notification
    {...props}
    style={{ 'background-color': ErrorColours.primary }}
  />
);

export { Error };
