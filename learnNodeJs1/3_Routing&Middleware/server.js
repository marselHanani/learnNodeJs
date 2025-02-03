const express = require('express');
const app = express();
//built-in middleware for JSON style requests
app.use(express.json());
//allow express to read the POST form data
app.use(express.urlencoded({extended:false}));
const router = express.Router(); // to write the routes in other syntax 
//#=================>>Type of Http Request <<===================
// Handling a GET request: Typically used to retrieve data from the server.
app.get('/', (req, res) => {
    res.send('Get Request');
});

// Handling a POST request: Used to send new data to the server, often to create a resource.
app.post('/newPost', (req, res) => {
    res.send('Post Request');
});

// Handling a PUT request: Used to update or replace an entire resource on the server. هون بعمل تعديل كامل
app.put('/', (req, res) => {
    res.send('Put Request');
});

// Handling a PATCH request: Used to partially update a resource on the server.يعني بعدل جزء فقط
app.patch('/', (req, res) => {
    res.send('Patch Request');
});

// Handling a DELETE request: Used to delete a resource from the server.
app.delete('/', (req, res) => {
    res.send('Delete Request');
});
//%======================>> Parameter with response <<===================
//* 1. Path Parameter
 app.get('/math/:x/:y', (req, res) => { // to create path parameter add (:) before the variable this mean is wait any val 
    const x = req.params.x;// to get the parameters that user entered it to make your logic 
    const y = req.params.y;
    res.send(`the summation is : ${Number(x)+Number(y)}`); // so the response will be the result of x + y 
}); // so now if i try this path in postman => (localhost:3000/math/3/5) => will print => the summation is : 8

//* 2. Query Parameter
 app.get('/api/user', (req, res) => { // the query parameter that is written after (?) in url 
    res.send(`The Age is : ${req.query.age}`); //
});// to can use it and check this example go to postman and write this url => (localhost:3000/api/user?age=22)
// here the query parameter is age so will the response will be => The Age is : 22

//*3. Body parameter
// but let this code run you must write above in this page app.use(express.json()) because the body is json so you must 
// do that to can your code run correctly 
 app.get('/api/user', (req, res) => {
    const user = req.body.name;
    res.send(`User: ${JSON.stringify(user)}`);
});// if we try it in postman and add body in postman with type json will run correctly and print the name 
// the body in postman must be like this  {"name": "marsel"} => so we call name form body to print it 

//#==========================>> you can return json 
app.get('/api/sayHi', (req, res) => {
    res.json({ 
        name: req.body.name,
        age: req.query.age
    });
}) // will return json file if we try this url => (localhost:3000/api/sayHi?age=22) and put in body {"name": "marsel"}
/* the result will be{
    "name": "marsel",
    "age": "22"
}*/
app.router.get('/api/sayHi', (req, res)=>{});

//or
// you can write the routers in other syntax and is more useful by using express.Router();
router('/categories').get((req, res) => {}).post((req, res) => {}).put((req, res) =>{}).delete((req, res) =>{});

// if you see create all http handlers in same line for same route 

app.listen(3000)
