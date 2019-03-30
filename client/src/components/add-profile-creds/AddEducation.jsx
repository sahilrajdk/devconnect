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
      disabled: this.state.disabled
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any Education Details</p>
              <small className="d-block pb-3">* = required field</small>
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
                <TextAreaFieldGroup
                  placeholder="Field of Study"
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
                    Still in School
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
