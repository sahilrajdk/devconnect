import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { Link } from "react-router-dom";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card__comment">
        <div className="card__comment-avatar">
          <Link to="">
            <img src={comment.avatar} alt="user avatar" />
          </Link>
        </div>

        <div className="card__comment-content">
          <div>
            <h4>{comment.name}</h4>
            <p>{comment.text}</p>
          </div>

          <div>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                className="custom-btn"
              >
                x
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
