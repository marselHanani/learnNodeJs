// to validate the request we have library named express-validator
// first thing install it (npm i express-validator)
const {check} = require('express-validator');
// for each route you create a validator : for example for get product there is a validator 
// , for create product there is a validator , for update and so on 
exports.postProductValidator = [
    check("name")
    .notEmpty()// to check if the name is empty or has a value 
    .withMessage("name is required")//if the name is empty print this error message 
    .isLength({min:3, max:20})// to check if the length of name is at least 3
    .withMessage("name must be at between 3 - 20 characters long")// if the length of name is less than 3 print this error message
    .isAlpha()// to check if the name is only letters
    .withMessage("name must contain only letters")// if the name contain numbers print this error message   
    .escape()// to escape any special characters
    ,
    check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 20 })
    .withMessage("Product description is required"),
    check("price")
    .isNumeric() // to chick if is a number or not 
    .withMessage("Product price must be a number")
    .custom(//it use for check some conditions
        (value,{req})=>{
            if(value <= 0){ // for example here i want check if the price more than zero or not 
                throw new Error("Product price must be greater than 0");
            }
            return true;
        }
    ),
    check("quantity")
    .isNumeric()
    .withMessage("Product quantity must be a number"),
    check("total")
    .isNumeric()
    .withMessage("total must be a number")
    .custom(
        (value,{req})=>{ // here example to know how you can use req here 
            if(value < (req.body.price * req.body.quantity)){// so here if the total was not equal price * quantity => error
                throw new Error("Total must be equal to price * quantity");
            }
        })
];
exports.getProductValidator = [
    check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Product id is not valid")
    .escape()
];

exports.updateProductValidator = [
    check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Product id is not valid")
    .escape()
    ,
    this.postProductValidator,// عشان ما اكرر نفس الفاليديتر 
];

exports.deleteProductValidator = [
    check("id")
    .notEmpty()
    .withMessage("Product id is required")
    .isMongoId()
    .withMessage("Product id is not valid")
];
//after finish will go to routes and put it as this style 
//app.get('/product/:id',getProductValidator,(req,res)=>{
    // here write your code 
//});