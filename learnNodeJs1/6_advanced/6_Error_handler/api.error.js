
// to handel errors you will follow these steps 
// 1- create enum inside file name error.status.js to indicate type of http status code 
// 2- create file named base.error.js to indicate the base constructor errors style by extends from Error module 
// and use capture Stack Trace  for this error, excluding BaseError from the trace 

const BaseError = require("./base.error");

class ApiError extends BaseError {
    constructor(name , httpStatusCode, description,isOptional){
        super(name, httpStatusCode, description,isOptional);
    }
}
module.exports = ApiError;

// now to use it see app.js file inside 6_advanced/app.js