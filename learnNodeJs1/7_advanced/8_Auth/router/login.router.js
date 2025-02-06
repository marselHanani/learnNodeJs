const express = require('express');
const router = express.Router();
const login = require('../controller/login.controller')
const jwt = require('../jwt');

router.post('/login',login.signIn);
router.get('/profile/:userId',jwt.verifyToken,login.getUserProfile);

module.exports = router; 