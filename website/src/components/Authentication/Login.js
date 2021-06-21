import React from 'react';
import { Row } from '../../style/table';
import Card from '../../style/card';
import { Button } from '../../style/buttons';
import { Text, Password } from '../../style/inputs';
import { connect } from 'react-redux';
import { logIn } from '../../stateManagement/reducers/auth';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <Card>
        <Text
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          label="Email"
        />
        <Password
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
        />
        <Row>
          <Button
            dataId="logInButton"
            onClick={() =>
              this.props.logIn({
                email: this.state.email,
                password: this.state.password,
              })
            }
          >
            Sign In
          </Button>
        </Row>
        <Row>
          <Button
            className="secondary"
            onClick={() => (window.location = '/register')}
          >
            Register
          </Button>
        </Row>
      </Card>
    );
  }
}

export default connect(() => ({}), {
  logIn,
})(Login);
