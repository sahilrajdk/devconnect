import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clrCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  state = {
    isOpen: false
  };
  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleLogout = e => {
    e.preventDefault();

    //this.props.clrCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;

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
          <Link to="/login" onClick={this.handleLogout} className="nav-link">
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
      <React.Fragment>
        <nav className="navbar">
          <Link className="nav-link navbar-brand" to="/">
            LinkUp!
          </Link>
          <div className="navbar-left">
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
          <div className="toggle" onClick={this.toggleMenu}>
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
          </div>
          {console.log(this.state.isOpen)}
        </nav>
        <div
          onClick={this.toggleMenu}
          className={
            this.state.isOpen ? "sidebar sidebar-show" : "sidebar sidebar-hide"
          }
        >
          <Link className="nav-link navbar-brand" to="/">
            LinkUp!
          </Link>
          <Link className="nav-link" to="/profiles">
            Developers
          </Link>
          {isAuthenticated ? authLinks : guestLinks}

          <a href="#" class="sidebar-close" onClick={this.toggleMenu}>
            &times;
          </a>
        </div>
      </React.Fragment>
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
