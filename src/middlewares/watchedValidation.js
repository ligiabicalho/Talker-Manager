const { HTTP_BAD_REQUEST } = require('../utils/constStatus');
const { isRequered } = require('../utils/utils');

const isValidDate = (data, next) => {
  const isValidFormat = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (!isValidFormat.test(data)) {
    return next({
        status: HTTP_BAD_REQUEST,
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
  }
};

const watchedValidation = (req, _resp, next) => {
  const { talk: { watchedAt } } = req.body;
  return isRequered(watchedAt, next, 'watchedAt')
  || isValidDate(watchedAt, next)
  || next();
};

module.exports = watchedValidation;