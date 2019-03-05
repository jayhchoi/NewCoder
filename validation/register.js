const validator = require('validator');

module.exports = validateRegisterInput = data => {
  let errors = {};

  const { name = '', email = '', password = '', password2 = '' } = data;

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = '2 ~ 30 글자 사이의 값을 입력해주세요';
  }

  if (validator.isEmpty(name)) {
    errors.name = '이름은 필수 입력값입니다';
  }

  if (!validator.isEmail(email)) {
    errors.email = '정상적인 이메일 주소를 입력해주세요';
  }

  if (validator.isEmpty(email)) {
    errors.email = '이메일은 필수 입력값입니다';
  }

  if (!validator.isLength(password, { min: 8, max: 30 })) {
    errors.password = '비밀번호는 최소 8자 이상의 값을 입력해주세요';
  }

  if (validator.isEmpty(password)) {
    errors.password = '비밀번호는 필수 입력값입니다';
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = '두 비밀번호가 일치하지 않습니다';
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = '비밀번호 확인은 필수 입력값입니다';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
