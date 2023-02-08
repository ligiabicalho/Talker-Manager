const { isRequered } = require('../utils/utils');

function talkValidation(req, _resp, next) {
  const { talk } = req.body;
  return isRequered(talk, next, 'talk') || next();
}

module.exports = talkValidation;