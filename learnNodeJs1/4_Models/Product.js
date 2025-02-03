const mongoose = require('mongoose');
const Schema = mongoose.Schema
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total : Number, // you can write it this or use {} to add more properties as above 
});
//* now we after we create a schema we want to create a model 
const Product = mongoose.model('Product',productSchema);//? the model function take two parameters => the name of model and the schema
// to can use this model with controller we must export it as a module and import it inside the controller 
module.exports = Product;
// now we will use it inside class database but actually we will use it inside controller 