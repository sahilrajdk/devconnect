import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }
  onDislikeClick(id) {
    this.props.removeLike(id);
  }

  isUserLiked(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card__post">
        <div className="card__post-avatar">
          <Link to="">
            <img src={post.avatar} alt="" />
          </Link>
        </div>

        <div className="post-right">
          <p className="text-center">{post.name}</p>
          <p className="lead">{post.text}</p>
          <div className="post-actions">
            {showActions ? (
              <React.Fragment>
                <div className="likebuttons">
                  {" "}
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="custom-btn"
                  >
                    <i
                      className={
                        this.isUserLiked(post.likes)
                          ? "text-info fas fa-thumbs-up"
                          : "fas fa-thumbs-up"
                      }
                    />
                    <span className="badge badge-light">
                      {post.likes.length}
                    </span>
                  </button>
                  <button
                    onClick={this.onDislikeClick.bind(this, post._id)}
                    type="button"
                    className="custom-btn"
                  >
                    <i
                      className={
                        this.isUserLiked(post.likes)
                          ? "text-secondary fas fa-thumbs-down"
                          : "fas fa-thumbs-down"
                      }
                    />
                  </button>
                </div>

                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                <div className="post_delete">
                  {post.user === auth.user.id ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      className="custom-btn btn-small"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
