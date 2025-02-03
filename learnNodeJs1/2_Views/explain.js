//* we have a thing called MVC (Model View Controller) => mean build full stack project using html , css for frontend
//* and nodejs as backend in same project without splitting them in different projects mean 
//? here we don't use react or angular here the frontend just be html , css and javascript with nodejs 
//# so the type of files that will write html inside it will be with extending ejs not html 
//% ejs extension => i can write code html and javascript in same lines 
//! to use it you must install library ejs by using this command line => npm install ejs

const express = require('express');
const app = express();
app.get('/static', (req, res) =>{
    res.sendFile(__dirname + 'static.html');// to send static data to the html files 
    //* __dirname is a global variable in node.js that represents the current directory from where the script is run.
})
//! but to send dynamic data to the html files you should use method called render()
app.get('/numbers',(req,res)=>{
    let num = '';
    for(let i = 0; i < 10; i++){
        num += i + '_';
    }
    res.render('numbers.ejs',{
        title: 'Numbers Page', // see the ejs file to watch how we reach to this variable
        numbers: num  //* this object will be used in numbers.ejs file to show the numbers
    });// the render method take two parameter the first is name of file and the seconde is the 
    //dynamic variable inside json style object
    //! be careful the ejs files must be inside folder named Views to avoid errors 


})
app.listen(3000)