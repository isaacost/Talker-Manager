const { Router } = require('express');
const { join } = require('path');
const crypto = require('crypto');
const { readFile } = require('../utils/fsCustom');

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

router.post('/login', (_req, res) => {
  res.status(200).json({ token: generateToken() });
});

module.exports = router;