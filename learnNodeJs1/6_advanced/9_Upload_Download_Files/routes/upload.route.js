const express = require('express');
const router = express.Router();
const upload = require('../controller/upload.controller');

router.post('/upload/file', upload.uploadFile);

module.exports = router;