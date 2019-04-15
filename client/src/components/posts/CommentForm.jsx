import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
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

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(newComment, this.props.postId);
    this.setState({
      text: ""
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="comment-form">
        <form noValidate onSubmit={this.handleSubmit}>
          <div className="form-group">
            <TextAreaFieldGroup
              placeholder="Make a Comment"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
              error={errors.text}
            />
          </div>
          <button type="submit" className="custom-btn btn-small">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapstateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapstateToProps,
  { addComment }
)(CommentForm);
