import React from "react";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={
          (error ? "is-invalid" : null) + " form-control form-control-lg"
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="invalid-feedback">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

InputGroup.defaultProps = {
  type: "text"
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default InputGroup;
