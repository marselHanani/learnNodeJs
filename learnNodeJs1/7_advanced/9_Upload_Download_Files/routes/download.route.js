const express = require('express');
const router = express.Router();
const download = require('../controller/download.controller');

router.get('/download/:file', download.downloadFile);

module.exports = router;