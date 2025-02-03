// Authentication: Verifies the user's identity (e.g., via username/password, token, or biometrics).
// Example: Logging in with a password to confirm your identity.

// Authorization: Determines what an authenticated user can access based on roles/permissions.
// Example: An admin can access all data, while a regular user can only view their profile.

// JWT (JSON Web Token):
// JWT is a secure, compact token used for authentication and authorization.
// It consists of three parts: 
// 1. Header: Specifies the signing algorithm.
// 2. Payload: Contains user data (e.g., ID, role).
// 3. Signature: Ensures the token’s integrity.
//
// How it works:
// - When a user logs in, the server generates a JWT and sends it to the client.
// - The client includes the token in the Authorization header of future requests.
// - The server verifies the token to grant or deny access.
//
// JWTs are stateless, meaning the server doesn’t store session data.
//
// To use JWT: 
// 1. Install: `npm i jsonwebtoken`
// 2. Create `jwt.js` with functions to generate and verify tokens.

const loggerServ = require('../../2_Logger/logger.services');  
const logger = new loggerServ('Permission_Logger');
const status = require('../../6_Error_handler/error.status');
const ApiError = require('../../6_Error_handler/api.error'); 
const User = require('../../7_User_Management/Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('../jwt');

// Function to get user profile
const getUserProfile = async (req, res, next) => {
    try {
        // Fetch user profile from the database using the user's ID from the request
        const userProfile = await User.findById(req.user._id);
        logger.info(`User profile retrieved for user ID: ${req.user._id}`);
        res.json(userProfile);
    } catch (error) {
        logger.error(`Error retrieving user profile for user ID: ${req.user._id}`, error);
        next(error);
    }
};

// Function to sign in user
const signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        // Look for the user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            logger.warn(`Invalid sign-in attempt: User with username '${username}' not found`);
            throw new ApiError('Invalid username', status.UNAUTHORIZED);
        }
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`Invalid sign-in attempt: Incorrect password for username '${username}'`);
            throw new ApiError('Invalid password', status.UNAUTHORIZED);
        }
        // Generate a JWT token upon successful authentication
        const token = jwt.generateToken(user);
        logger.info(`User '${username}' signed in successfully`);
        res.json({ token });
    } catch (error) {
        logger.error('Error during sign-in process', error);
        next(error);
    }
};
module.exports = { getUserProfile, signIn };

