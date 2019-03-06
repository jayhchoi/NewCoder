const validator = require('validator');

module.exports = validatePostInput = data => {
  const errors = {};

  const { text = '', tag = '' } = data;

  // if (!validator.isLength(text, { min: 10, max: 300 })) {
  //   errors.text = 'Text must be between 10 and 300 chars';
  // }

  if (tag === null) {
    errors.text = '태그를 선택해주세요';
  }

  if (validator.isEmpty(text)) {
    errors.text = '내용을 입력해주세요';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
