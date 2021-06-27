import React from 'react'
import { Row } from '../../style/table'
import { Paper } from '@material-ui/core'
import { Button } from '../../style/buttons'
import {
  Weight,
  Text,
  Password,
  Date as DateInput,
  Select,
} from '../../style/inputs'
import { connect } from 'react-redux'
import { register } from '../../stateManagement/reducers/auth'

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      password: '',
      weight: '',
      gender: '',
      birthDate: '',
    }
  }

  getValue = (value) => (value ? value : undefined)

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  render() {
    return (
      <Paper>
        <Text
          name="firstname"
          value={this.state.firstname}
          onChange={this.onChange}
          label="First Name"
          required
          fullWidth
        />
        <Text
          name="middlename"
          value={this.state.middlename}
          onChange={this.onChange}
          label="Middle Name(s)"
          fullWidth
        />
        <Text
          name="lastname"
          value={this.state.lastname}
          onChange={this.onChange}
          label="Last Name"
          required
          fullWidth
        />
        <Text
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          label="Email"
          required
          fullWidth
        />
        <Password
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
          fullWidth
        />
        <Weight
          name="weight"
          value={this.state.weight}
          onChange={this.onChange}
          label="Weight"
          unit="kg"
          required
          fullWidth
        />
        <Select
          name="gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
          value={this.state.gender}
          onChange={this.onChange}
          label="Gender"
          fullWidth
        />
        <DateInput
          name="birthDate"
          max={new Date().toISOString().split('T')[0]}
          label="Date of Birth"
          value={this.state.birthDate}
          onChange={this.onChange}
          required
          fullWidth
        />
        <Row>
          <Button
            onClick={() =>
              this.props.register({
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
              })
            }
            name="registerButton"
          >
            Register
          </Button>
        </Row>
        <Row>
          <Button onClick={() => (window.location = '/login')} isSecondary>
            Login
          </Button>
        </Row>
      </Paper>
    )
  }
}

export default connect(() => ({}), {
  register,
})(Register)
