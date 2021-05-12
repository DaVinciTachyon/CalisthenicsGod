import React from 'react';
import { Row, Column } from '../style/table';
import { Error as ErrorColours } from '../style/constants';
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

const Notification = styled(BaseNotification)``;

//FIXME
// const Error = styled(Notification)`
//   background-color: ${ErrorColours.primary};
// `;

const Error = styled(Row)`
  ${Notification} {
    background-color: ${ErrorColours.primary};
  }
`;

export { Notification, Error };
