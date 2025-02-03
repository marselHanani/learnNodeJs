const loggerServ = require('../../2_Logger/logger.services')
const logger = new loggerServ('Role_Logger');
const Role = require('../Models/role.model');
const status = require('../../6_Error_handler/error.status');
const ApiError = require('../../6_Error_handler/api.error');

//get list of roles
exports.getRolesList = async (req, res, next) => {
    try {
        const roles = await Role.find();
        if (!roles.length) {
            return next(new ApiError("No roles found", status.NOT_FOUND, "No roles found in the database"));
        }
        logger.info('Get roles list');
        res.status(200).json({ success: true, roles });
    } catch (error) {
        next(error); 
    }
};

//get role by id

exports.getRoleById = async (req, res, next) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return next(new ApiError("Role not found", status.NOT_FOUND, "Role not found in the database"));
        }
        logger.info(`Get role by id: ${req.params.id}`);
        res.status(200).json({ success: true, role });
    } catch (error) {
        next(error);
    }
};

//add new role

exports.CreateRole = async (req, res, next) => {
    try {
        const { name, permissions } = req.body;
        if (!name || !Array.isArray(permissions) || permissions.length === 0) {
            return next(new ApiError("Role name and at least one permission are required", status.BAD_REQUEST));
        }
        const newRole = new Role({ name, permissions });
        await newRole.save();
        logger.info(`Add new role: ${newRole.name}`);
        res.status(201).json({ success: true, role: newRole });
    } catch (error) {
        next(error);
    }
};

//update role by id
exports.updateRole = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, permissions } = req.body;
        if (!name || !Array.isArray(permissions) || permissions.length === 0) {
            return next(new ApiError("Role name and at least one permission are required", status.BAD_REQUEST));
        }
        const updatedRole = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
        if (!updatedRole) {
            return next(new ApiError("Role not found", status.NOT_FOUND, "Role not found in the database"));
        }
        logger.info(`Update role by id: ${req.params.id}`);
        res.status(200).json({ success: true, role: updatedRole });
    } catch (error) {
        next(error);
    }
};

//delete role by id
exports.deleteRole = async (req, res, next) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return next(new ApiError("Role not found", status.NOT_FOUND, "Role not found in the database"));
        }
        logger.info(`Delete role by id: ${req.params.id}`);
        res.status(200).json({ success: true, message: "Role deleted successfully" });
    } catch (error) {
        next(error);
    }
};