const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExpInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title cannot be empty";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Job company cannot be empty";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Working from date cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
