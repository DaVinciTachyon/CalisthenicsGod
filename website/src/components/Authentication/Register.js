import React from 'react';
import './Main.css';

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
  }

  componentDidMount() {
    if (localStorage.getItem('authToken')) window.location = '/';
  }

  handleSubmit(evt) {
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
    fetch(`${window.env.API_URL}/auth/register`, {
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

  handleFirstNameChange(evt) {
    this.setState({
      firstname: evt.target.value,
    });
  }

  handleMiddleNameChange(evt) {
    this.setState({
      middlename: evt.target.value,
    });
  }

  handleLastNameChange(evt) {
    this.setState({
      lastname: evt.target.value,
    });
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  }

  handlePasswordChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  handleWeightChange(evt) {
    this.setState({
      weight: evt.target.value,
    });
  }

  handleGenderChange(evt) {
    this.setState({
      gender: evt.target.value,
    });
  }

  handleBirthDateChange(evt) {
    this.setState({
      birthDate: evt.target.value,
    });
  }

  dismissError() {
    this.setState({ error: '' });
  }

  render() {
    return (
      <div className="page">
        <form onSubmit={this.handleSubmit.bind(this)} className="card">
          {this.state.error && (
            <h3 data-test="error" onClick={this.dismissError.bind(this)}>
              <button onClick={this.dismissError.bind(this)}>✖</button>
              {this.state.error}
            </h3>
          )}
          <label for="firstname">First Name</label>
          <input
            name="firstname"
            type="text"
            value={this.state.firstname}
            onChange={this.handleFirstNameChange.bind(this)}
            placeholder="First Name"
            required
          />
          <label for="middlename">Middle Name</label>
          <input
            name="middlename"
            type="text"
            value={this.state.middlename}
            onChange={this.handleMiddleNameChange.bind(this)}
            placeholder="Middle Name"
          />
          <label for="lastname">Last Name</label>
          <input
            name="lastname"
            type="text"
            value={this.state.lastname}
            onChange={this.handleLastNameChange.bind(this)}
            placeholder="Last Name"
            required
          />
          <label for="email">Email</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
            placeholder="Email"
            required
          />
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            placeholder="Password"
          />
          <label for="weight">Weight</label>
          <input
            name="weight"
            type="number"
            step="0.1"
            min="0"
            value={this.state.weight}
            onChange={this.handleWeightChange.bind(this)}
            placeholder="Weight"
            required
          />
          <label for="gender">Gender</label>
          <select
            name="gender"
            onChange={this.handleGenderChange.bind(this)}
            required
          >
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
            onChange={this.handleBirthDateChange.bind(this)}
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
      </div>
    );
  }
}
