import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//custom input components
import TextFieldGroup from "./../common/TextFieldGroup";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import InputGroup from "./../common/InputGroup";
import SelectListGroup from "./../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";

import isEmpty from "./../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      //change skills back from array to csv
      const skillCsv = profile.skills.join(",");

      //if profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";

      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillCsv,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };

    this.props.createProfile(profileData, this.props.history);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Handle"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.handleChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.handleChange}
            error={errors.facebook}
          />{" "}
          <InputGroup
            placeholder="instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.handleChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="LinkedIn"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.handleChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="youtube"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.handleChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    //options for status in form
    const options = [
      {
        label: "Select Professional Status",
        value: 0
      },
      { label: "Developer", value: "Developer" },
      { label: "Student", value: "Student" },
      { label: "Jnr Developer", value: "Jnr Developer" },
      { label: "Snr Developer", value: "Snr Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Intern", value: "Intern" },
      { label: "Teacher/Instructor", value: "Teacher/Instructor" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create__profile">
        <div className="create__profile-header">
          <Link to="/dashboard" className="custom-btn btn-small">
            Go Back
          </Link>
          <h3>Create Your Profile</h3>
          <p>Let's get some information to make your profile stand out</p>
          <small>* = required field</small>
        </div>

        <form noValidate onSubmit={this.handleSubmit}>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            error={errors.handle}
            value={this.state.handle}
            onChange={this.handleChange}
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.handleChange}
            error={errors.status}
            options={options}
          />
          <TextFieldGroup
            placeholder="Company"
            name="company"
            error={errors.company}
            value={this.state.company}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="website"
            name="website"
            error={errors.website}
            value={this.state.website}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="location"
            name="location"
            error={errors.location}
            value={this.state.location}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="Add your skills,use commas between skills"
            name="skills"
            error={errors.skills}
            value={this.state.skills}
            onChange={this.handleChange}
          />
          <TextFieldGroup
            placeholder="GitHub username"
            name="githubusername"
            error={errors.githubusername}
            value={this.state.githubusername}
            onChange={this.handleChange}
          />
          <TextAreaFieldGroup
            placeholder="Short Bio"
            name="bio"
            error={errors.bio}
            value={this.state.bio}
            onChange={this.handleChange}
          />
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                this.setState(prevState => ({
                  displaySocialInputs: !prevState.displaySocialInputs
                }));
              }}
              className="custom-btn btn-small"
            >
              Add Social Network Details (optional)
            </button>
          </div>
          <div>{socialInputs}</div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="custom-btn btn-small mt-2"
            />
          </div>
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
