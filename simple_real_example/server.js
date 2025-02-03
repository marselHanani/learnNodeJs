//*=====>> here i want to explain the common structures of any project <<===================
//# 1- create config folder to write code that make configurations like configure with mongo database
//# 2- create models folder to write your models structure that you want to apply it in database
//# 3- create controllers folder to write your logic inside it 
//# 4- create Routes folder to write your routes 
//# 5- create this file (server.js) or you can named it any common name like: app.js , index.js or any name 
//*-------------------------->> now how we can start <<-----------------
//npm init to initialize your project 
// npm i express to start your project
const express = require('express');
const app = express(); // create object from express to use library 
const noteRoute = require('./4_Routes/notesRoute');
const dotenv = require('dotenv');
app.use(express.json());
dotenv.config({path: 'config.env'}); // to read.env file
// 1- connect with database 
const DbConnection = require('./1_config/database');
    
    DbConnection(); // connect to database

//2- add routes
//% to add routes you should write it inside routes folder then use it here 
//app.use('/api/v1',noteRoute);//it is run at this url (http://localhost:3000/api/v1) // in sample example 
//?==========================>> real example <<==============================
app.use('/api/v1',noteRoute);//it is run at this url (http://localhost:3000/api/v1/notes) 
//! you can use the postman application to test your code 

// 3- start server listening 
app.listen(process.env.PORT, ()=> {
    console.log(`server is running on port ${process.env.PORT}`);  // if server is running then console will print this message  // in sample example
});