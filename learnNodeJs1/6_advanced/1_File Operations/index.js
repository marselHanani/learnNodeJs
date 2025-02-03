
// if you want to use import instead of require => go to package.json and at least write this ("type": "module")
// so instead of write (const fs = require("fs");) /=> you can use (import fs from "fs";)
// fs => is i shortest of file system library 
//=====================>> Synchronous code <<===============
import fs from "fs";
// if i want read from file 
const data = fs.readFileSync('./data.txt','utf-8');// take to parameter the first is file path , the second is the option to read
// i can put path use (__dirname) global function 
console.log(data);
console.log("hello"); // will print hello after print data from file 
// if i want to write into file 
fs.writeFileSync('./data.txt','hello world'); 
//*  we use Sync to execute the operations as a seres => line by line -> when the first operation finish the second start
//%====================>> Promise Asynchronous code <<============================
//# but if i want to use asynchronous i have to ways : the first is promise 
const asyncData = fs.readFile('./data.txt','utf-8',(err,data)=>{
    if (err) console.log(err)
        console.log(data);
    const data2 = fs.readFile('./data2.txt','utf-8',()=>{})// this way have a problem is => callback hell 
    // يعني بصير الكود معقد كله جوا بعضه زي شكل هرمي لو قرات 5 او 10 ملفات
}); // this function take third parameter the third is callback function to make operations after the data reach 
console.log('hello')//! in this example when run code you will see (hello) printed before the data from the file because  
//! is work in asynchronous mode => the read file need time so will execute other operations until reading the file finish
//%========================>> async and await code <<==============================
// but the good way is using async await => you must use this library import fs from "fs/promises"
import fs from "fs/promises"
const getData = async ()=> {
    const data = await fs.readFile('./data.txt','utf-8');
    const data2 = await fs.readFile('./data2.txt','utf-8');
    const data3 = await fs.readFile('./data3.txt','utf-8');
    console.log(data,data2,data3);
}// look at the different this code is very clean and clear not as above code and you can put is inside try catch block 
getData();
console.log("hello world ")
