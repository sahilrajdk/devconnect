import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      clientId: "5c72a4edd283d86fa710",
      clientSecret: "2044e611f4399d58dff40c79024bec7ff078c645",
      count: 4,
      sort: "created asc",
      repos: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { githubusername } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="repo_card">
        <div>
          <div>
            <h4>
              <Link
                to={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="badges">
            <span className="badge badge-info ">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary ">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="view__profile-github">
        <h3 className="mb-4">Latest GitHub Repos</h3>
        <div className="repo_cards">{repoItems}</div>
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  githubusername: PropTypes.string.isRequired
};

export default ProfileGithub;
