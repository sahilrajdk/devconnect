import React, { Component } from "react";

import { connect } from "react-redux";
import { registerUser } from "./../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "./../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
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
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <h1 className="display-4 text-center">Sign Up</h1>
        <p className="lead text-center">Create your DevConnector account</p>
        <form noValidate="novalidate" onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            error={errors.name}
          />
          <TextFieldGroup
            placeholder="Email"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            error={errors.email}
            // info=" This site uses Gravatar so if you want a profile image,
            //         use a Gravatar email"
          />

          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            error={errors.password}
          />

          <TextFieldGroup
            placeholder="Repeat Password"
            name="password2"
            type="password"
            value={this.state.password2}
            onChange={this.handleChange}
            error={errors.password2}
          />

          <button type="submit" className="custom-btn btn-large">
            SUBMIT
          </button>
        </form>
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
)(withRouter(Register));
