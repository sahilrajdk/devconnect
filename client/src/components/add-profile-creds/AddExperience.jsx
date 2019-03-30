import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import TextFieldGroup from "./../common/TextFieldGroup";

import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      description: "",
      location: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const expData = {
      company: this.state.company,
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      disabled: this.state.disabled
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  error={errors.company}
                  value={this.state.company}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  error={errors.title}
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <TextAreaFieldGroup
                  placeholder="Short Description about your role/work"
                  name="description"
                  error={errors.description}
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  error={errors.location}
                  value={this.state.location}
                  onChange={this.handleChange}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  error={errors.from}
                  value={this.state.from}
                  onChange={this.handleChange}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  error={errors.to}
                  value={this.state.to}
                  onChange={this.handleChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check label">
                    Current Job
                  </label>
                </div>
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
