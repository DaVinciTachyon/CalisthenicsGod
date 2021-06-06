import React from 'react';
import { Row, Column } from '../style/table';
import {
  Text,
  Error as ErrorColours,
  Success as SuccessColours,
} from '../style/constants';
import styled from 'styled-components';

class BaseNotification extends React.Component {
  dismiss = () => {
    this.props.dismiss();
  };

  render() {
    if (this.props.text)
      return (
        <Row
          columns={4}
          onClick={this.dismiss}
          className={this.props.className}
        >
          <Column span={3}>{this.props.text}</Column>
          <Column onClick={this.dismiss}>✖</Column>
        </Row>
      );
    else return <></>;
  }
}

const Notification = styled(BaseNotification)`
  border-radius: 4px;
  background-color: ${Text.secondary.alternative};
`;

const Error = styled(Notification)`
  background-color: ${ErrorColours.primary};
`;

const Success = styled(Notification)`
  background-color: ${SuccessColours.primary};
`;

export { Notification, Error, Success };
