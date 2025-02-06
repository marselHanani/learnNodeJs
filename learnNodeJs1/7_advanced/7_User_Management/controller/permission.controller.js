
const loggerServ = require('../../2_Logger/logger.services')
const logger = new loggerServ('Permission_Logger');
const Permission = require('../Models/permission.model');
const status = require('../../6_Error_handler/error.status');
const ApiError = require('../../6_Error_handler/api.error');

// get all permissions

exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        logger.info('Get all permissions successfully', permissions);
        res.status(200).json(permissions);
    } catch (error) {
        logger.error('Error fetching permissions', error);
        throw new ApiError('Failed to fetch permissions', status.INTERNAL_SERVER_ERROR);
    }
};
//get permission by  id 
exports.getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id);

        if (!permission) {
            throw new ApiError('Permission not found', status.NOT_FOUND);
        }

        logger.info('Permission fetched successfully', permission);
        res.status(200).json(permission);
    } catch (error) {
        logger.error('Error fetching permission', error);
        throw new ApiError('Failed to fetch permission', status.INTERNAL_SERVER_ERROR);
    }
};

// create a new permission
exports.createPermission = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new ApiError('Name is required', status.BAD_REQUEST);
        }
        const newPermission = new Permission({ name });
        await newPermission.save();

        logger.info('New permission created successfully', newPermission);
        res.status(201).json(newPermission);
    } catch (error) {
        logger.error('Error creating permission', error);
        throw new ApiError('Failed to create permission', status.INTERNAL_SERVER_ERROR);
    }
};

// update a permission
exports.updatePermission = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedPermission = await Permission.findByIdAndUpdate(req.params.id, { name }, { new: true });

        if (!updatedPermission) {
            throw new ApiError('Permission not found', status.NOT_FOUND);
        }

        logger.info('Permission updated successfully', updatedPermission);
        res.status(200).json(updatedPermission);
    } catch (error) {
        logger.error('Error updating permission', error);
        throw new ApiError('Failed to update permission', status.INTERNAL_SERVER_ERROR);
    }
};

// delete a permission
exports.deletePermission = async (req, res) => {
    try {
        const deletedPermission = await Permission.findByIdAndDelete(req.params.id);

        if (!deletedPermission) {
            throw new ApiError('Permission not found', status.NOT_FOUND);
        }

        logger.info('Permission deleted successfully', deletedPermission);
        res.status(200).json(deletedPermission);
    } catch (error) {
        logger.error('Error deleting permission', error);
        throw new ApiError('Failed to delete permission', status.INTERNAL_SERVER_ERROR);
    }
};