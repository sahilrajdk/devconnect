import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  handleDelete = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const educationData = this.props.educationData.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => this.handleDelete(edu._id)}
            className="custom-btn btn-small btn-delete"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div className="subcontent__education">
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Years</th>
            </tr>
          </thead>
          <tbody>{educationData}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
