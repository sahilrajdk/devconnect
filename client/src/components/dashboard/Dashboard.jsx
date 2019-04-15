import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount
} from "./../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleOnDeleteAccount = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check for empty profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <React.Fragment>
            <div className="header">
              <p>
                Welcome
                <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
              </p>
              <ProfileActions />
              <button
                onClick={this.handleOnDeleteAccount}
                className="custom-btn btn-small btn-delete"
              >
                Delete My Account
              </button>
            </div>
            <div className="subcontent">
              <Experience experienceData={profile.experience} />
              <Education educationData={profile.education} />
            </div>
          </React.Fragment>
        );
      } else {
        //user has no profile yet
        dashboardContent = (
          <React.Fragment>
            <div className="header">
              <div>
                <p>
                  Welcome {user.name},Please Setup your profile.{" "}
                  <Link to="/create-profile">Add Profile</Link>{" "}
                </p>
              </div>
            </div>
          </React.Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="dashboard__content">{dashboardContent}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProfile = state => ({
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProfile,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
