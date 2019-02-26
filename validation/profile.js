const validator = require('validator');

module.exports = validateProfileInput = data => {
  let errors = {};

  const { status = '', skills = '', interests = '' } = data;

  if (validator.isEmpty(status)) {
    errors.status = 'Status field is required';
  }

  if (typeof skills === String && validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required';
  }

  if (typeof interests === String && validator.isEmpty(interests)) {
    errors.interests = 'interests field is required';
  }

  if (data.website) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
