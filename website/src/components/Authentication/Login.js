import React from 'react';
import './Main.css';

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
    this.dismissError = this.dismissError.bind(this);
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
          window.location.reload(false);
        }
        this.setState({ error: data.error });
      })
      .catch((err) => console.error(err));
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  dismissError() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="card">
        {this.state.error && (
          <h3 data-test="error" onClick={this.dismissError}>
            <button onClick={this.dismissError}>✖</button>
            {this.state.error}
          </h3>
        )}
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
