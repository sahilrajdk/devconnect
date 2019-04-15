import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Profileitem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div class="profile__card">
        <div className="profile__card-avatar">
          <img src={profile.user.avatar} alt="" className="rounded-circle" />
        </div>
        <div className="profile__card-bio">
          <h3>{profile.user.name}</h3>
          <p>
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </p>
          <p>
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link
            to={`/profile/${profile.handle}`}
            className="custom-btn btn-small"
          >
            View Profile
          </Link>
        </div>
        <div className="profile__card-skills">
          <h4>Skill Set</h4>
          <ul className="list-group">
            {profile.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="list-group-item">
                <i className="fa fa-check pr-1" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Profileitem.propTypes = {
  profile: PropTypes.object.isRequired
};
export default Profileitem;
