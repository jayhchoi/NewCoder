const validator = require('validator');

module.exports = validateLoginInput = data => {
  let errors = {};

  const { email = '', password = '' } = data;

  if (!validator.isEmail(email)) {
    errors.email = '정상적인 이메일 주소를 입력해주세요';
  }

  if (validator.isEmpty(email)) {
    errors.email = '이메일은 필수 입력값입니다';
  }

  if (validator.isEmpty(password)) {
    errors.password = '비밀번호는 필수 입력값입니다';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
