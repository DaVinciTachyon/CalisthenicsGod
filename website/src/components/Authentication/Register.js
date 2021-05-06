import React from 'react';
import '../../style/Authentication.css';
import Error from '../Error';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      password: '',
      weight: '',
      gender: 'male',
      birthDate: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    evt.preventDefault();
    if (!this.state.firstname)
      return this.setState({ error: 'First Name is required' });
    if (!this.state.lastname)
      return this.setState({ error: 'Last Name is required' });
    if (!this.state.email) return this.setState({ error: 'Email is required' });
    if (!this.state.password)
      return this.setState({ error: 'Password is required' });
    if (!this.state.weight)
      return this.setState({ error: 'Weight is required' });
    if (!this.state.gender)
      return this.setState({ error: 'Gender is required' });
    if (!this.state.birthDate)
      return this.setState({ error: 'Birth Date is required' });
    fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: {
          first: this.state.firstname,
          middle: this.state.middlename ? this.state.middlename : undefined,
          last: this.state.lastname,
        },
        email: this.state.email,
        password: this.state.password,
        weight: this.state.weight,
        gender: this.state.gender,
        birthDate: this.state.birthDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) window.location = '/login';
        this.setState({ error: data.error });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} className="card">
        <Error
          error={this.state.error}
          dismissError={() => this.setState({ error: '' })}
        />
        <label for="firstname">First Name</label>
        <input
          name="firstname"
          type="text"
          value={this.state.firstname}
          onChange={this.onChange}
          placeholder="First Name"
          required
        />
        <label for="middlename">Middle Name</label>
        <input
          name="middlename"
          type="text"
          value={this.state.middlename}
          onChange={this.onChange}
          placeholder="Middle Name"
        />
        <label for="lastname">Last Name</label>
        <input
          name="lastname"
          type="text"
          value={this.state.lastname}
          onChange={this.onChange}
          placeholder="Last Name"
          required
        />
        <label for="email">Email</label>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.onChange}
          placeholder="Email"
          required
        />
        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
          placeholder="Password"
        />
        <label for="weight">Weight</label>
        <input
          name="weight"
          type="number"
          step="0.1"
          min="0"
          value={this.state.weight}
          onChange={this.onChange}
          placeholder="Weight"
          required
        />
        <label for="gender">Gender</label>
        <select name="gender" onChange={this.onChange} required>
          <option value="male" defaultValue>
            Male
          </option>
          <option value="female">Female</option>
        </select>
        <label for="birthDate">Birth Date</label>
        <input
          name="birthDate"
          type="date"
          max={new Date().toISOString().split('T')[0]}
          placeholder="Date of Birth"
          value={this.state.birthDate}
          onChange={this.onChange}
          required
        />
        <input
          className="primaryButton button"
          type="submit"
          value="Register"
        />
        <a className="secondaryButton button" href="/login">
          Login
        </a>
      </form>
    );
  }
}
