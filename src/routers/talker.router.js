const { Router } = require('express');
const { join } = require('path');
const { readFile } = require('../utils/fsCustom');

const router = Router();
const PATH = join(__dirname, '../talker.json');

router.get('/', async (_req, res) => {
const talkers = await readFile(PATH);
res.status(200).json(talkers);
});

module.exports = router;