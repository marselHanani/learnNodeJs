const loggerServ = require('../../2_Logger/logger.services')
const logger = new loggerServ('User_Logger');
const User = require('../Models/user.model');
const status = require('../../6_Error_handler/error.status');
const ApiError = require('../../6_Error_handler/api.error');
const bcrypt = require('bcrypt'); // this is library for hashing passwords
exports.getUserList = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return next(new ApiError("No users found", status.NOT_FOUND, "No users found in the database"));
        }
        logger.info('Get user list');
        res.status(200).json({ success: true, users });
    } catch (error) {
        next(error); 
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ApiError("User not found", status.NOT_FOUND, "User not found in the database"));
        }
        logger.info('Get user by id');
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { username, email, phone, password, role } = req.body;
        const hashPass = await bcrypt.hash(password, 10); // ✅ استخدم await هنا
        const user = new User({ username, email, phone, password: hashPass, role }); // ✅ ضعها في password وليس hashPass
        await user.save();
        logger.info('User created successfully');
        res.status(201).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};


exports.updateUser = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, phone, password }, { new: true });
        if (!updatedUser) {
            return next(new ApiError("User not found", status.NOT_FOUND, "User not found in the database"));
        }
        logger.info('User updated successfully');
        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return next(new ApiError("User not found", status.NOT_FOUND, "User not found in the database"));
        }
        logger.info('User deleted successfully');
        res.status(200).json({ success: true, user: deletedUser });
    } catch (error) {
        next(error);
    }
};
// get user with his roles
exports.getUserWithRoles = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');
        if (!user) {
            return next(new ApiError("User not found", status.NOT_FOUND, "User not found in the database"));
        }
        logger.info('Get user with roles');
        res.status(200).json({ success: true, user });
    } catch (error) {
        next(error);
    }
};

// get user with his roles names 
// collection هاي بس عشان تعرفو كيف بنجيب داتا من اكثر من 
    exports.getUserWithRolesNames = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id).populate('role', 'name-_id');//use populate to get roles while get user
            // here we make name-_id => return just the name of role 
            if (!user) {
                return next(new ApiError("User not found", status.NOT_FOUND, "User not found in the database"));
            }
            logger.info('Get user with roles names');
            res.status(200).json({ success: true, user });
        } catch (error) {
            next(error);
        }
    };