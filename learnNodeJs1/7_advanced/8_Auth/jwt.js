
// JWT (JSON Web Token) Utility Functions
// These functions help in generating and verifying JWT tokens for authentication.

// Benefits of JWT:
// - Stateless: No need to store sessions on the server.
// - Secure: Uses cryptographic signing to prevent tampering.
// - Efficient: Compact format suitable for transmitting over HTTP headers.

// generateToken(user)
// - Creates a JWT token containing user details (_id, email, role, phone).
// - Signs the token using a secret key.(create a token using your secret key)
// - Sets an expiration time (e.g., 1 hour).
const jwt = require("jsonwebtoken");

const secret = "3f548bd9"; 
exports.generateToken = (user) => { 
    const token = jwt.sign(
      { 
        _id: user._id, 
        email: user.email,
        role: user.role,
        phone: user.phone
      },
      secret, // Secret key used for signing the token to ensuring its authenticity and preventing tampering.
      { expiresIn: "1h" } //The token will stay stored in client just one hour 
    );
    return token;
  };
  
  // verifyToken(req, res, next)
  // - Extracts the token from the request header.
  // - Validates the token using the secret key.
  // - If valid, attaches the decoded user info to the request object.
  exports.verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]; // Get token from request header.
    if (!token) return res.status(403).json({ message: "Token is not provided" });
    jwt.verify(token, secret, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
      req.user = user; // Attach decoded user info to request object.
      next(); 
    });
  };

  const Role = require('../7_User_Management/Models/role.model');

  // middleware for isAdmin authentication
  exports.isAdmin = async (req, res, next) => {
    try {
      const id = req.user.role;
      const role = await Role.findById(id);
      if (!role) {
        return res.status(403).json({ message: "Role not found" });
      }
      if (role.name !== "Admin") {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next(); // Proceed if the role is Admin
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

  // How JWT Works:
  // 1️ User logs in → Server generates a JWT using `generateToken()`.
  // 2️ The client stores the JWT (e.g., in localStorage or cookies).
  // 3️ For protected routes, the client sends the JWT in the `Authorization` header.
  // 4️ Server verifies the token using `verifyToken()` before granting access and sent response.
//! search about refresh token 