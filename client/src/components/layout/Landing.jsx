import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="landing__content">
          <h1>A Link for Developers</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers.
          </p>

          <div className="landing__buttons">
            <Link className="custom-btn btn-large" to="/register">
              Sign Up
            </Link>
            <Link className="custom-btn btn-large" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
