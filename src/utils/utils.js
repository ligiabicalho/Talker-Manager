const fs = require('fs').promises;
const path = require('path');
const { HTTP_BAD_REQUEST } = require('./constStatus');

const talkerPath = path.resolve(__dirname, '../talker.json');
let nextId = 5;

const readTalker = async () => {
  try {
    const data = await fs.readFile(talkerPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const getTalkerID = async (id) => {
  const talkers = await readTalker();
  const talker = talkers.find((t) => t.id === Number(id));
  return talker;
};

const isRequered = (fieldValue, next, value) => {
  if (!fieldValue) {
    return next({
      status: HTTP_BAD_REQUEST,
      message: `O campo "${value}" é obrigatório`,
    });
  }
};

const writeTalker = async (data) => {
  try {
    await fs.writeFile(talkerPath, JSON.stringify(data));
  } catch (error) {
    console.error(`Arquivo não pôde ser escrito: ${error}`);
  }
};

const addTalker = async (data) => {
  const allTalkers = await readTalker();
  const newTalker = {
    id: nextId,
    ...data,
  };
  nextId += 1;
  allTalkers.push(newTalker);
  await writeTalker(allTalkers);
  return newTalker;
};

module.exports = { readTalker, isRequered, writeTalker, addTalker, getTalkerID };