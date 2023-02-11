const HTTP_BAD_REQUEST = 400;
const { isRequered } = require('../utils/utils');

const emailValidation = (req, _resp, next) => {
  const { email } = req.body;
  const isEmailValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  isRequered(email, next, 'email');

  if (!isEmailValid.test(email)) {
    return next({ 
      status: HTTP_BAD_REQUEST, message: 'O "email" deve ter o formato "email@email.com"' });
}
  return next();
};

module.exports = emailValidation;