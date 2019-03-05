const validator = require('validator');

module.exports = validateEducationInput = data => {
  const errors = {};

  const { school = '', degree = '', fieldofstudy = '', from = '' } = data;

  if (validator.isEmpty(school)) {
    errors.school = '학교(학원)명은 필수 입력값입니다';
  }

  if (validator.isEmpty(degree)) {
    errors.degree = '학위(과정)명은 필수 입력값입니다';
  }

  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = '전공분야 필수 입력값입니다';
  }

  if (validator.isEmpty(from)) {
    errors.from = '시작일 필수 입력값입니다';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
