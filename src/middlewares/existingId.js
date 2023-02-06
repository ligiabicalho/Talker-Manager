const { readFile } = require('../utils/utils');

const HTTP_NOT_FOUND = 404;

const existingId = async (req, resp, next) => {
      const talkers = await readFile();
  if (talkers.some((t) => t.id === Number(req.params.id))) {
    next();
  } else {
    resp.status(HTTP_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
  }
};

module.exports = existingId;