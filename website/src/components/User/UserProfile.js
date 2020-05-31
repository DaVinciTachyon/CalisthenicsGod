import React from "react";
import ProfileEditor from "./ProfileEditor";

export default class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      update: false,
    };
  }

  async componentDidMount() {
    if (!localStorage.getItem("authToken")) window.location = "/login";
  }

  editProfile = () => {
    this.setState({ update: !this.state.update });
  };

  render() {
    return (
      <div className="page">
        <ProfileEditor editProfile={this.editProfile} />
      </div>
    );
  }
}
