const { HTTP_BAD_REQUEST } = require('../utils/constStatus');

const nameValidation = (req, _resp, next) => {
  const { name } = req.body;
  if (!name || !name.length) {
    return next({ status: HTTP_BAD_REQUEST, message: 'O campo "name" é obrigatório' });
  }
  const nameValid = name.length >= 3;
  if (!nameValid) {
    return next({ 
      status: HTTP_BAD_REQUEST, 
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  return next();
};

module.exports = nameValidation;