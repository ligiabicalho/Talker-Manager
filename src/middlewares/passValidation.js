const HTTP_BAD_REQUEST = 400;
const { isRequered } = require('../utils/utils');

const passValidation = (req, _resp, next) => {
  const { password } = req.body;

  isRequered(password, next, 'password');
  
  const isPasswordValid = password.length >= 6;
  if (!isPasswordValid) {
    return next({ 
      status: HTTP_BAD_REQUEST, 
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
}
  return next();
};

module.exports = passValidation;