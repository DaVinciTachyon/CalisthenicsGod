import React from 'react';
import '../../style/Authentication.css';
import Error from '../Error';

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

  onSubmit(evt) {
    evt.preventDefault();
    if (!this.state.email) return this.setState({ error: 'Email is required' });
    if (!this.state.password)
      return this.setState({ error: 'Password is required' });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data['auth-token']) {
          localStorage.setItem('authToken', data['auth-token']);
          window.location.reload();
        }
        this.setState({ error: data.error });
      })
      .catch((err) => console.error(err));
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} className="card">
        <Error error={this.state.error} dismissError={() => this.setState({ error: '' })}/>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.onChange}
          placeholder="Email"
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          placeholder="Password"
        />
        <input
          className="primaryButton button"
          type="submit"
          value="Sign In"
        />
        <a className="secondaryButton button" href="/register">
          Register
        </a>
      </form>
    );
  }
}
