const express = require('express');
const { readFile } = require('./readFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const HTTP_ERR_STATUS = 500;

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
