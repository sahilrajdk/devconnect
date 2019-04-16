import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  handleDelete = id => {
    this.props.deleteExperience(id);
  };
  render() {
    const experienceData = this.props.experienceData.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(exp._id)}
            className="custom-btn btn-small btn-delete"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="subcontent__experience">
        <h4>Industry Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{experienceData}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
