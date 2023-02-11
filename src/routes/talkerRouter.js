const express = require('express');
const { getAllTalkers, addTalker, getTalkerById, writeTalkers } = require('../utils/utils');
const existingId = require('../middlewares/existingId');
const tokenValidation = require('../middlewares/tokenValidation');
const nameValidation = require('../middlewares/nameValidation');
const ageValidation = require('../middlewares/ageValidation');
const talkValidation = require('../middlewares/talkValidation');
const watchedValidation = require('../middlewares/watchedValidation');
const rateValidation = require('../middlewares/rateValidation');
const { HTTP_OK_STATUS, HTTP_CREATED, HTTP_NO_CONTENT } = require('../utils/constStatus');

const router = express.Router();

router.get('/', async (_req, resp, next) => {
  try {
    const talkers = await getAllTalkers();
    resp.status(HTTP_OK_STATUS).json(talkers);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', existingId, async (req, resp, next) => {
  try {
    const talker = await getTalkerById(req.params.id);
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

router.put('/:id', existingId, tokenValidation, 
  nameValidation, ageValidation, talkValidation,
  watchedValidation, rateValidation, async (req, resp, next) => {
  try {
  const { id } = req.params;
  const updateTalker = req.body;
  const talkers = await getAllTalkers();

  const index = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[index] = { id: Number(id), ...updateTalker };
  await writeTalkers(talkers);

  resp.status(HTTP_OK_STATUS).json(talkers[index]);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', existingId, tokenValidation, 
  async (req, resp, next) => {
  try {
    const { id } = req.params;
     const talkers = await getAllTalkers();

    const removeTalker = talkers.filter((talker) => talker.id !== Number(id));
    await writeTalkers(removeTalker);

    resp.status(HTTP_NO_CONTENT).end();
    } catch (error) {
    return next(error);
    }
  });

module.exports = router;