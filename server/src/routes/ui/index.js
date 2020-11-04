const express = require('express');

const router = express.Router();
const path = require('path');

const buildPath = path.resolve(__dirname, '../../../build');

router.use(express.static(buildPath));

router.get('*', (req, res) => {
  res.sendFile(`${buildPath}/index.html`);
});

module.exports = router;
