const express = require('express');
const validateLogin = require('../middlewares/validateLogin');

const loginRouter = express.Router();

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', validateLogin, (req, resp, next) => {
  try {
    const token = generateToken();
    return resp.status(HTTP_OK_STATUS).json({ token });
  } catch (error) {
      return next(error);
  }
});