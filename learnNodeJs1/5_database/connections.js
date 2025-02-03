// we prefer use mongodb database you can use any database you want
// to make connection is easy we will install library named mongoose => npm install mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('../4_Models/Product')
//% to connect to mongodb you need url of your mongodb server you can get it from your cluster 
// we will use connect function return promise => we take promise in js you can search about it 
mongoose.connect("mongodb+srv://marselhanani1:Marsel8042003@cluster0.smbml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> {
    console.log("Connection successfully ");
}).catch(err => {
    console.error("error connecting to Mongo database");
});
// now after run your application look at console if connection is successfully or failed 
// now the our project must have three things Models , Views and Controllers 
//* Models : have a classes that will apply on database to be as a table or documents 
//# Views : have a ejs files to write part of front end using html, css and javascript
//% Controller : have a nodes => that will tie the views with models and have the logic part of code 

// before see the code under this comment see folder Models 
// first example to add data to collection in database manually 
app.post('/products', async (req, res) => {
    const newProduct = new Product();
    newProduct.name = "Snickers";
    newProduct.description = "type of chocolate"
    newProduct.price = 10;
    newProduct.quantity = 4; 
    await newProduct.save(); // this method is called to save the product into database and it is return promise so we can use 
    // then or async await 
    res.send("new product added successfully")
})
//* but ot create automatically the new product by the client 
app.use(express.json());// don't forget use json style from express to run the code below correctly
app.post('/newProduct', async (req, res) => {
    const {name, description, price, quantity} = req.body; // this is called decorator => must same the name in the body 
    const newProduct = new Product({name, description, price, quantity});
    await newProduct.save();
    res.json(newProduct)// to return the product that you add it as a json style 
});

app.get('/products',async (req,res)=>{
    const products = await Product.find(); // will return all products that have been added
    res.json(products)
})
// to get product by id 
app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) res.json(product)
    else res.status(404).send("Product not found")
})

// to update product by id
app.put('/products/:id', async (req, res) => {
    const {name, description, price, quantity} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {name, description, price, quantity}, {new: true});
    if(updatedProduct) res.json(updatedProduct)
    else res.status(404).send("Product not found")
});

// to delete product by id

app.delete('/products/:id', async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if(deletedProduct) res.json(deletedProduct)
    else res.status(404).send("Product not found")
});

//+====================================
// but if i want tie it with ejs files ? 
app.get('/showProducts', async(req,res)=>{
    const products = await Product.find();
    res.render('showProducts.ejs',{allProducts:products});
});
app.listen(3000);