import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileActions extends Component {
  render() {
    return (
      <div className="profileActions" role="group">
        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle" />
          Edit Profile
        </Link>
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie" />
          Add Experience
        </Link>
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap" />
          Add Education
        </Link>
      </div>
    );
  }
}

export default ProfileActions;
