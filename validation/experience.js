const validator = require('validator');

module.exports = validateExperienceInput = data => {
  const errors = {};

  const { title = '', company = '', from = '' } = data;

  if (validator.isEmpty(title)) {
    errors.title = '직책은 필수 입력값입니다';
  }

  if (validator.isEmpty(company)) {
    errors.company = '회사명은 필수 입력값입니다';
  }

  if (validator.isEmpty(from)) {
    errors.from = '입사일은 필수 입력값입니다';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
