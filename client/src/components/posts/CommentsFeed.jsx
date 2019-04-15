import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentsFeed extends Component {
  render() {
    const { comments, postId } = this.props;

    return (
      <div className="comments_feedpage">
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    );
  }
}

CommentsFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired
};

export default CommentsFeed;
