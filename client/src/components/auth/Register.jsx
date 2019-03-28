import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";
import PropTypes from "prop-types";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate="novalidate" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={
                      (errors.name ? "is-invalid" : null) +
                      " " +
                      "form-control form-control-lg"
                    }
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    required
                    onChange={this.handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      <p>{errors.name}</p>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={
                      (errors.email ? "is-invalid" : null) +
                      " " +
                      "form-control form-control-lg"
                    }
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      <p>{errors.email}</p>
                    </div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      (errors.password ? "is-invalid" : null) +
                      " " +
                      "form-control form-control-lg"
                    }
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      <p>{errors.password}</p>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={
                      (errors.password2 ? "is-invalid" : null) +
                      " " +
                      "form-control form-control-lg"
                    }
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">
                      <p>{errors.password2}</p>
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
