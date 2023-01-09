const path = require('path');
const rootDir = require('../util/path'); // C:\Users\User\Desktop\tutorials\JS-node\middleware
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
