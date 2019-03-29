import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "./../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check for empty profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>DISPLAY the Profile</h4>;
      } else {
        //user has no profile yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name},</p>
            <p>Please Setup your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Add Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProfile = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProfile,
  { getCurrentProfile }
)(Dashboard);

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
