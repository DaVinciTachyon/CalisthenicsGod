import React from 'react';
import { Error } from '../Notification';
import { Row, Column } from '../../style/table';
import Card from '../../style/card';
import { Link } from 'react-router-dom';
import { Button, SecondaryButton } from '../../style/buttons';

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
    }
    this.setState({ error: data.error });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <Card>
        <Row columns={2}>
          <Column span={2}>
            <Error
              text={this.state.error}
              dismiss={() => this.setState({ error: '' })}
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Email</Column>
          <Column>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="Email"
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column>Password</Column>
          <Column>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
            />
          </Column>
        </Row>
        <Row columns={2}>
          <Column span={2}>
            <Button onClick={this.onSubmit}>Sign In</Button>
          </Column>
        </Row>
        <Row columns={2}>
          <Column span={2}>
            <Link to="/register">
              <SecondaryButton>Register</SecondaryButton>
            </Link>
          </Column>
        </Row>
      </Card>
    );
  }
}
