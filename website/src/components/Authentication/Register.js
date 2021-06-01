import React from 'react';
import { Error } from '../../style/notification';
import { Row } from '../../style/table';
import Card from '../../style/card';
import { Button } from '../../style/buttons';
import {
  Weight,
  Text,
  Password,
  Date as DateInput,
  Select,
} from '../../style/inputs';

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstname: undefined,
      middlename: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      weight: undefined,
      gender: undefined,
      birthDate: undefined,
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = () => {
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
    fetch(`${process.env.REACT_APP_API_URL}/auth/register/`, {
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
        else this.setState({ error: data.error });
      });
  };

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value });
  onSelectChange = (evt) => this.setState({ [evt.name]: evt.value });

  render() {
    return (
      <Card>
        <Error
          text={this.state.error}
          dismiss={() => this.setState({ error: '' })}
        />
        <Text
          name="firstname"
          value={this.state.firstname}
          onChange={this.onChange}
          label="First Name"
          required
        />
        <Text
          name="middlename"
          value={this.state.middlename}
          onChange={this.onChange}
          label="Middle Name"
        />
        <Text
          name="lastname"
          value={this.state.lastname}
          onChange={this.onChange}
          label="Last Name"
          required
        />
        <Text
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          label="Email"
          required
        />
        <Password
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
        />
        <Weight
          name="weight"
          value={this.state.weight}
          onChange={this.onChange}
          label="Weight"
          unit="kg"
          required
        />
        <Select
          name="gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          value={this.state.gender}
          onChange={this.onSelectChange}
          label="Gender"
          required
        />
        <DateInput
          name="birthDate"
          max={new Date().toISOString().split('T')[0]}
          label="Date of Birth"
          value={this.state.birthDate}
          onChange={this.onChange}
          required
        />
        <Row>
          <Button onClick={this.onSubmit}>Register</Button>
        </Row>
        <Row>
          <Button
            className="secondary"
            onClick={() => (window.location = '/login')}
          >
            Login
          </Button>
        </Row>
      </Card>
    );
  }
}
