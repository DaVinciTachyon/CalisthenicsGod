import React from 'react'
import { Button } from '../../style/buttons'
import { Text, Password } from '../../style/inputs'
import { connect } from 'react-redux'
import { logIn } from '../../stateManagement/reducers/auth'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'

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
        <Button
          name="logInButton"
          onClick={() =>
            this.props.logIn({
              email: this.state.email,
              password: this.state.password,
            })
          }
          fullWidth
        >
          Sign In
        </Button>
        <Link to="/register">
          <Button isSecondary fullWidth>
            Register
          </Button>
        </Link>
      </Paper>
    )
  }
}

export default connect(() => ({}), {
  logIn,
})(Login)
