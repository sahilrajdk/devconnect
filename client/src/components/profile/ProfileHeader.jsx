import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="view__profile-header">
        {isEmpty(profile.user.avatar) ? null : (
          <img src={profile.user.avatar} alt="" />
        )}
        <div>
          <h1>{profile.user.name}</h1>
          <p>
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
        </div>
        <div className="view__profile-social">
          <p>
            {isEmpty(profile.website) ? null : (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <a
                className="text-white p-2"
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}

            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a
                href={profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a
                href={profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a
                href={profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a
                href={profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
