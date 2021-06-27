import React from 'react'
import { Row } from '../../style/table'
import { Button } from '../../style/buttons'
import { Text, Password } from '../../style/inputs'
import { connect } from 'react-redux'
import { logIn } from '../../stateManagement/reducers/auth'
import { Paper } from '@material-ui/core'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  onChange = (evt) => this.setState({ [evt.target.name]: evt.target.value })

  render() {
    return (
      <Paper>
        <Text
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          label="Email"
          fullWidth
        />
        <Password
          name="password"
          value={this.state.password}
          onChange={this.onChange}
          label="Password"
          fullWidth
        />
        <Row>
          <Button
            name="logInButton"
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
          <Button onClick={() => (window.location = '/register')} isSecondary>
            Register
          </Button>
        </Row>
      </Paper>
    )
  }
}

export default connect(() => ({}), {
  logIn,
})(Login)
