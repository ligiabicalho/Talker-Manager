const HTTP_BAD_REQUEST = 400;

const passValidation = (req, _resp, next) => {
  const { password } = req.body;
  const isPasswordValid = password.length >= 6;
  if (!password) {
    return next({ status: HTTP_BAD_REQUEST, message: 'O campo "password" é obrigatório' });
  }
  if (!isPasswordValid) {
    return next({ 
      status: HTTP_BAD_REQUEST, 
      message: 'O campo "password" deve conter 6 caracteres ou mais',
    });
}
  return next();
};

module.exports = passValidation;