const { HTTP_BAD_REQUEST } = require('../utils/constStatus');
const { isRequered } = require('../utils/utils');

function ageValidation(req, _resp, next) {
  const { age } = req.body;

  isRequered(age, next, 'age');

  if (typeof age === 'string') {
    return next({ status: HTTP_BAD_REQUEST, 
      message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
    return next({ status: HTTP_BAD_REQUEST, 
      message: 'O campo "age" deve ser um "number" do tipo inteiro' });
  }
  if (age <= 18) {
    return next({ status: HTTP_BAD_REQUEST, 
      message: 'A pessoa palestrante deve ser maior de idade' });
  }
    return next();
}

module.exports = ageValidation;