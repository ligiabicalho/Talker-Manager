const express = require('express');
const { readFile } = require('../utils/utils');
const existingId = require('../middlewares/existingId');
const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');

const { HTTP_OK_STATUS } = require('../utils/constStatus');

const router = express.Router();

router.get('/', async (_req, resp, next) => {
  try {
    const talkers = await readFile();
    resp.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', existingId, async (req, resp, next) => {
  try {
    const talkers = await readFile();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    resp.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return next(error);
  }
});

router.post('/', tokenValidation, nameValidation, ageValidation, async (_req, resp, next) => {
  try {
    resp.status(HTTP_OK_STATUS).json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;