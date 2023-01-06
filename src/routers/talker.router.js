const { Router } = require('express');
const { join } = require('path');
const crypto = require('crypto');
const { readFile, writeFile } = require('../utils/fsCustom');
const { verifyLogin } = require('../middlewares/login.middlewar');
const { verifyAuth, verifyName, verifyAge, verifyTalk, 
  verifyWatchedAt, verifyRate, verifyRate2 } = require('../middlewares/talkers.middlewar');

const router = Router();
const PATH = join(__dirname, '../talker.json');

router.get('/talker', async (_req, res) => {
const talkers = await readFile(PATH);
res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(PATH);
  const findTalker = talkers.find((element) => Number(element.id) === Number(id));
  if (!findTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(findTalker);
});

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/login', verifyLogin, (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

router.post('/talker', verifyAuth, verifyName, verifyAge, verifyTalk, 
verifyWatchedAt, verifyRate, verifyRate2, async (req, res) => {
  const { body } = req;
  const talkers = await readFile(PATH);
  const id = talkers.reduce((acc, cur) => Math.max(acc, Number(cur.id)), 0) + 1;
  const createdTalker = { id, ...body };
  const newData = [...talkers, createdTalker];
  await writeFile(PATH, newData);
  res.status(201).json(createdTalker);
});

module.exports = router;