//* the middleware is a step between requests and the function that will apply at request 
    //* it's a function that takes three arguments (req, res, next) =>
    //* req => the request object
    //* res => the response object
    //* next => a function that call the next middleware or the function that will be called after middleware
    //* if you don't call next middleware by using next() => then your application will stuck in a loop 
//* the middleware as a doors between request and response for example validation and logic need to make it at request  
//* before send a response to the client side
const express = require('express');
const app = express();
const router = express.Router();

// Middleware 1: Application-level middleware
// Log the request
app.use((req, res, next) => {
    console.log(`Request type: ${req.method} - URL: ${req.url}`);
    next(); // Call the next middleware
});

//Validate the request
app.use((req, res, next) => {
    if (!req.query.name || req.query.name.length < 5) {
        res.status(400).send('Invalid name');
        return; // Stop the request from going to the next middleware
    }
    next(); // Call the next middleware
});

// Middleware 2:  Router-level middleware
router.get('/process', (req, res) => {
    res.send(`Hello, ${req.query.name}!`);
});

// Middleware 3:  Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Middleware 4:  Built-in middleware 
    app.use(express.static('public')); // Serve static files from the 'public' folder
    app.use(express.json()); // Parse JSON request bodies
    app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});