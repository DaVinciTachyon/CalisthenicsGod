import React from 'react';
import { Error } from '../../style/notification';
import { Row } from '../../style/table';
import Card from '../../style/card';
import { Button } from '../../style/buttons';
import { Text, Password } from '../../style/inputs';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = async () => {
    if (!this.state.email) return this.setState({ error: 'Email is required' });
    if (!this.state.password)
      return this.setState({ error: 'Password is required' });
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      }
    );
    const data = await response.json();
    if (data['auth-token']) {
      localStorage.setItem('authToken', data['auth-token']);
      window.location = '/';
    } else this.setState({ error: data.error });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <Card>
        <Error
          text={this.state.error}
          dismiss={() => this.setState({ error: '' })}
        />
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
          <Button data-test="signInButton" onClick={this.onSubmit}>
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
