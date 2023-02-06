const express = require('express');
const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 500;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online on port', PORT);
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

app.use((error, _req, _res, next) => {
  console.error(error.stack);
  next(error);
});

app.use((error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status || HTTP_ERR_STATUS).json({ message });
});