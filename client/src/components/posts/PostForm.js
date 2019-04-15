import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState(
      {
        text: ""
      },
      () => {
        this.props.handlebutton();
      }
    );
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="post-form">
        <div className="post-form-content">
          <div>Create Post</div>
          <div className="card-body">
            <form noValidate onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Post"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="custom-btn btn-small">
                Submit
              </button>
              <button className="custom-btn btn-small">X</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapstateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapstateToProps,
  { addPost }
)(PostForm);
