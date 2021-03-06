import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addEducation } from "../../actions/profileActions";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import TextFieldGroup from "./../common/TextFieldGroup";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      description: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      disabled: this.state.disabled,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add__edu">
        <div className="add__edu-header">
          <Link to="/dashboard" className="custom-btn btn-small">
            Go Back
          </Link>
          <h3 className="display-4 text-center">Add Education</h3>
          <p className="lead text-center">Add any Education Details</p>
          <small className="d-block pb-3">* = required field</small>
        </div>

        <form noValidate onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="* School"
            name="school"
            error={errors.school}
            value={this.state.school}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="* Degree"
            name="degree"
            error={errors.degree}
            value={this.state.degree}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="* Field of Study"
            name="fieldofstudy"
            error={errors.fieldofstudy}
            value={this.state.fieldofstudy}
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
          <TextAreaFieldGroup
            placeholder="Short Description about your Degree/Education"
            name="description"
            error={errors.description}
            value={this.state.description}
            onChange={this.handleChange}
          />
          <div className="form-check">
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
              Still in School
            </label>
          </div>
          <input
            type="submit"
            value="submit"
            className="custom-btn btn-small mt-2"
          />
        </form>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
