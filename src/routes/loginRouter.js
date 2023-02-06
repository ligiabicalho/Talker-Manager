const express = require('express');
const emailValidation = require('../middlewares/emailValidation');
const passValidation = require('../middlewares/passValidation');
const tokenGenerator = require('../utils/tokenGenerator');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.post('/', emailValidation, passValidation, (_req, resp, next) => {
  try {
    const token = tokenGenerator();
    return resp.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
      return next(error);
  }
});

module.exports = router;