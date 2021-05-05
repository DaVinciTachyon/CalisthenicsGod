import React from "react";

export default class Page extends React.Component {
  async componentDidMount() {
    if (!localStorage.getItem("authToken"))
        window.location = "/login";
    else if (localStorage.getItem("authToken") && this.props.notIn)
        window.location = "/";
  }

  render() {
    return (
      <div className="page">
        {this.props.children}
      </div>
    );
  }
}
