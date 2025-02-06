const express = require('express');
const app = express();
const router = express.Router();
const {getProductValidator} = require('./validate')
const {validationResult} = require('express-validator')//required to validate work 

        // express-validator package is used for validation of input data. It returns an array of validation errors.
        // Each error object has a property "param" which contains the field name and "msg" which contains the error message. 
        //here we are sending the errors as json response.in real world application, you can send these errors to your frontend for displaying them to the user
        // you can also send them to your server for further processing. this is just for demonstration purpose.  
        // in a real application, you should not send errors as json response.
        // instead, you should return a HTTP status code and an appropriate error message to the client.  
        // in express-validator, you can use req.flash() to set a flash message which will be displayed to the user on the next request.
        // in your frontend, you can use a library like "sweetalert" or "toastify" to display these flash messages.
app.get('/valid/:id',getProductValidator,(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})  // return error as json response  
    }
    res.json({message: 'Product is valid'})
})
app.listen(3000,()=>{console.log("listening")});
