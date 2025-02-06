const express = require('express');
const router = express.Router();
const permission = require('../controller/permission.controller')

router.get('/permissions',permission.getAllPermissions)
.get('/permissions/:id', permission.getPermissionById)
.post('/permissions',permission.createPermission)
.put('/permissions/:id',permission.updatePermission)
.delete('/permissions/:id',permission.deletePermission);

module.exports = router; 