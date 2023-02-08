const { HTTP_BAD_REQUEST } = require('../utils/constStatus');
// const { isRequered } = require('../utils/utils');

const nameValidation = (req, _resp, next) => {
  const { name } = req.body;
  if (!name) {
    return next({
      status: HTTP_BAD_REQUEST,
      message: 'O campo "name" é obrigatório',
    });
  }
  if (name.length <= 3) {
    return next({ 
      status: HTTP_BAD_REQUEST, 
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  return next();
};

module.exports = nameValidation;