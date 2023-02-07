const HTTP_UNAUTHORIZED_STATUS = 401;

const tokenValidation = (req, _resp, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ status: HTTP_UNAUTHORIZED_STATUS, message: 'Token não encontrado' });
  }
  const tokenValid = authorization.length === 16 && typeof authorization === 'string';
  if (!tokenValid) {
    return next({ 
      status: HTTP_UNAUTHORIZED_STATUS, 
      message: 'Token inválido',
    });
  }
  return next();
};

module.exports = tokenValidation;