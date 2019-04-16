import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    //convert array to csv  for skills

    const skills = profile.skills.map((skill, index) => (
      <li key={index}>
        <i className="fa fa-check" />
        {skill}
      </li>
    ));

    return (
      <div className="view__profile-bio">
        <div className="bio-left">
          <h3 className="text-center text-info">{firstName}'s Bio</h3>
          <p className="lead">
            {isEmpty(profile.bio) ? (
              <span>{firstName} does not have a bio yet</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
        </div>
        <div className="bio-right">
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="view__profile-skills">
            <ul>{skills}</ul>
          </div>
        </div>
      </div>
    );
  }
}
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
