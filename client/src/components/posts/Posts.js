import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostsFeed from "./PostsFeed";

class Posts extends Component {
  state = {
    displayform: false
  };
  componentDidMount() {
    this.props.getPosts();
  }

  handleAddPostButton = () => {
    this.setState({
      displayform: !this.state.displayform
    });
  };

  render() {
    const { posts, loading } = this.props.post;

    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostsFeed posts={posts} />;
    }
    return (
      <div className="posts_feed">
        <button
          onClick={this.handleAddPostButton}
          className="custom-btn btn-small"
        >
          Add Post
        </button>
        {this.state.displayform ? (
          <PostForm handlebutton={this.handleAddPostButton} />
        ) : null}

        {postContent}
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
