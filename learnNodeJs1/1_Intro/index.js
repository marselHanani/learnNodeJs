// to use node js the first step you have to do it => open command(cmd) and write => (npm init)
//? the npm init will create a package json file this file will be used to initialize your package that have all dependencies
// the second step is install express library by this command => npm install express
// ? the express library help us to build the server (backend server) by using node js 
//# now to start our project we must call express library 
const express = require("express"); //? require is a function that responsible for importing modules 
// now the express variable is a function 
const app = express(); //* the app variable is an instance of express which will control with all application and use the express library 

// the first methods inside the express we will use it ==>> Routes 
app.get('/hello',(req,res)=>{ // the each route is consist of a url and a function => the function is consist of request and response
    res.send("hello");
});//* if the client visit the our url (/hello) the our server will send to the client message "hello"


//! To let server ready to listen for user requests we have a very important function that we will call once in the entire project.
app.listen(3000,()=> { //=> this method called once and it's take port number (you can add any port you want),arrow function 
    console.log("server is listening on port 3000");
})
//% now to run your application open command and write (node index.js)or your file name but in this way your server can't
//% watch the changes that you make it until you turn off your server and run it again so we have a better way : 
//? we have library named nodemon to use it you can writ this command => npx nodemon index.js
// and change you making it after save you will apply changes and restart automatically
//*-----------------------------------------------------------------------------------------
//* now to sent request for your server you need fore things : 
//# 1.http request type(get,post,put,delete) 2.server address 3.server port 4. url or path 
//? because we use our laptop as a server so the address will be localhost
// so the link or url we use it to send requests is => localhost:3000/hello
// so open your browser and try the url after run your application in above url will see => hello
//? because in router (get) your response was return hello 
//! to can use all http requests type and test your code you can use postman application 

/*
* after watched this file go to routing folder to see all types of Http requests and how write the code 
# then go to the Views directory to see how we can use html with node js as a one full project
*/
