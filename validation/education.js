const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEduInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School name is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree name is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Study start dateis required";
  }
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Study Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
