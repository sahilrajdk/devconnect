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
      <div className="add__exp">
        <div className="add__exp-header">
          <Link to="/dashboard" className="custom-btn btn-small">
            Go Back
          </Link>
          <h3>Add Experience</h3>
          <p>
            Add any developer/programming positions that you have had in the
            past
          </p>
          <small>* = required field</small>
        </div>
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
          <div className="form-check ">
            <input
              type="checkbox"
              className="form-check-input"
              name="current"
              value={this.state.current}
              checked={this.state.current}
              onChange={this.onCheck}
              id="current"
            />
            <label htmlFor="current">Current Job</label>
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
