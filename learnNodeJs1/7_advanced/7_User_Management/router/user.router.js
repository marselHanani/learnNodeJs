const express = require('express');
const router = express.Router();
const user = require('../controller/user.controller')

router.get('/users',user.getUserList);
router.get('/users/:id',user.getUserById);
router.get('/users-role/:id',user.getUserWithRolesNames);
router.post('/users',user.createUser);
router.put('/users/:id',user.updateUser);
router.delete('/users/:id',user.deleteUser);
module.exports = router; 