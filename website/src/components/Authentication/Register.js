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
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      password: '',
      weight: '',
      gender: '',
      birthDate: '',
      error: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getValue = (value) => (value ? value : undefined);

  onSubmit = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/register/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: {
            first: this.getValue(this.state.firstname),
            middle: this.getValue(this.state.middlename),
            last: this.getValue(this.state.lastname),
          },
          email: this.getValue(this.state.email),
          password: this.getValue(this.state.password),
          weight: this.getValue(this.state.weight),
          gender: this.getValue(this.state.gender),
          birthDate: this.getValue(this.state.birthDate),
        }),
      }
    );
    const data = await response.json();
    if (data.user) window.location = '/login';
    else this.setState({ error: data.error });
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
          label="Middle Name(s)"
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
          <Button onClick={this.onSubmit} dataId="registerButton">
            Register
          </Button>
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
