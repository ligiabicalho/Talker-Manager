const express = require('express');
const { readTalker, addTalker, getTalkerID } = require('../utils/utils');
const existingId = require('../middlewares/existingId');
const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedValidation = require('../middlewares/watchedValidation');
const rateValidation = require('../middlewares/rateValidation');
const { HTTP_OK_STATUS, HTTP_CREATED } = require('../utils/constStatus');

const router = express.Router();

router.get('/', async (_req, resp, next) => {
  try {
    const talkers = await readTalker();
    resp.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', existingId, async (req, resp, next) => {
  try {
    const talkers = await readTalker();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    resp.status(HTTP_OK_STATUS).json(talker);
  } catch (error) {
    return next(error);
  }
});

router.post('/', tokenValidation, nameValidation,
  ageValidation, talkValidation,
  watchedValidation, rateValidation, async (req, resp, next) => {
  try {
    const { body } = req;
    const newTalker = await addTalker(body);
    resp.status(HTTP_CREATED).json(newTalker);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', (req, resp, next) => {
  const { id } = req.params;
  getTalkerID(id);
});

module.exports = router;