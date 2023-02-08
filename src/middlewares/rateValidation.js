const { HTTP_BAD_REQUEST } = require('../utils/constStatus');

const isValidRate = (rate, next) => {
  const biggestThanZero = rate >= 1;
  const lessThanSix = rate <= 5;
  const interger = Number.isInteger(rate);
  if (!biggestThanZero || !lessThanSix || !interger) {
    return next({
      status: HTTP_BAD_REQUEST,
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
};

const rateValidation = (req, _resp, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return next({
      status: HTTP_BAD_REQUEST,
      message: 'O campo "rate" é obrigatório',
    });
  }
  return isValidRate(rate, next)
  || next();
};

module.exports = rateValidation;