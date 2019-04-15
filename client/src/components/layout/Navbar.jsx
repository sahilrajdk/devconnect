import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clrCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  handleLogout = e => {
    e.preventDefault();

    //this.props.clrCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav authlinks">
        <li className="nav-item">
          <Link to="/feed" className="nav-link">
            Posts Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={this.handleLogout} className="nav-link">
            LogOut
          </Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav guestlinks">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar">
        <div className="navbar-left">
          <Link className="navbar-brand" to="/">
            LinkUp!
          </Link>

          <ul className="navbar-nav">
            <li className="navbar-item">
              <Link className="nav-link" to="/profiles">
                Developers
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clrCurrentProfile }
)(Navbar);
