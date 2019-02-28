const validator = require('validator');

module.exports = validateProfileInput = data => {
  let errors = {};

  const { status = '', skills = '', interests = '' } = data;

  if (validator.isEmpty(status)) {
    errors.status = '직업은 필수 입력값입니다';
  }

  if (skills.length === 0) {
    errors.skills = '개발언어/기술스택은 필수 입력값입니다';
  }

  if (interests.length === 0) {
    errors.interests = '관심분야는 필수 입력값입니다';
  }

  if (data.website) {
    if (!validator.isURL(data.website)) {
      errors.website = '정상적인 URL을 입력해주세요';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
