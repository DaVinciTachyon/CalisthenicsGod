import React from "react";
import "./Main.css";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("authToken")) window.location = "/";
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if (!this.state.email) return this.setState({ error: "Email is required" });
    if (!this.state.password)
      return this.setState({ error: "Password is required" });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    };
    fetch("http://localhost:8080/auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data["auth-token"]) {
          localStorage.setItem("authToken", data["auth-token"]);
          window.location.reload(false);
        }
        this.setState({ error: data.error });
      })
      .catch((err) => console.error(err));
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

  dismissError() {
    this.setState({ error: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="card">
        {this.state.error && (
          <h3 data-test="error" onClick={this.dismissError}>
            <button onClick={this.dismissError}>✖</button>
            {this.state.error}
          </h3>
        )}
        <label for="email">Email</label>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleEmailChange}
          placeholder="Email"
        />
        <label for="email">Password</label>
        <input
          type="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          placeholder="Password"
        />
        <input className="primaryButton button" type="submit" value="Sign In" />
        <a className="secondaryButton button" href="/register">
          Register
        </a>
      </form>
    );
  }
}
