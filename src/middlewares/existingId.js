const { readTalker } = require('../utils/utils');
const { HTTP_NOT_FOUND } = require('../utils/constStatus');

const existingId = async (req, _resp, next) => {
  const talkers = await readTalker();
  
  if (!talkers.some((t) => t.id === Number(req.params.id))) {
    return next({ status: HTTP_NOT_FOUND, message: 'Pessoa palestrante não encontrada' });
  }
  return next();
};

module.exports = existingId;