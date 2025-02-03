const express = require('express');
const router = express.Router();
const role = require('../controller/role.controller')

router.get('/roles',role.getRolesList)
.get('/roles/:id', role.getRoleById)
.post('/roles',role.CreateRole)
.put('/roles/:id',role.updateRole)
.delete('/roles/:id',role.deleteRole);

module.exports = router; 