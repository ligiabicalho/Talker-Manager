const HTTP_BAD_REQUEST = 400;

const passValidation = (req, _resp, next) => {
  const { password } = req.body;
  if (!password) {
    return next({ status: HTTP_BAD_REQUEST, message: 'O campo "password" é obrigatório' });
  }
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