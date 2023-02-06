const express = require('express');
const { readFile } = require('./utils/utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 500;
const HTTP_NOT_FOUND = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online on port', PORT);
});

app.get('/talker', async (_req, resp) => {
  try {
    const talkers = await readFile();
    resp.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    resp.status(HTTP_ERR_STATUS).send({ message: err.message });
  }
});

app.get('/talker/:id', async (req, resp) => {
  try {
    const talkers = await readFile();
    const talker = talkers.find(({ id }) => id === Number(req.params.id));
    if (!talker) {
      return resp.status(HTTP_NOT_FOUND).send({ message: 'Pessoa palestrante não encontrada' });
    }
    resp.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    resp.status(HTTP_ERR_STATUS).send({ message: err.message });
  }
});